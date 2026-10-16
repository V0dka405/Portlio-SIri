'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  forwardRef,
} from 'react';
import { usePathname } from 'next/navigation';
import HomeView from './HomeView';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Certificates from './Certificates';
import Experience from './Experience';
import Contact from './Contact';
import { profile } from '@/data/profile';

export type RoutePath =
  | '/'
  | '/about'
  | '/projects'
  | '/skills'
  | '/certificates'
  | '/experience'
  | '/contact';

const PAGE_TITLES: Record<RoutePath, string> = {
  '/': `${profile.name} — ${profile.title.en}`,
  '/about': `About | ${profile.name}`,
  '/projects': `Projects | ${profile.name}`,
  '/skills': `Skills | ${profile.name}`,
  '/certificates': `Certifications | ${profile.name}`,
  '/experience': `Experience & Education | ${profile.name}`,
  '/contact': `Contact | ${profile.name}`,
};

function normalizePath(path: string | null | undefined): RoutePath {
  if (!path || path === '/') return '/';
  const cleaned = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  if (cleaned in PAGE_TITLES) return cleaned as RoutePath;
  return '/';
}

interface PageRouterContextValue {
  currentPath: RoutePath;
  navigate: (to: RoutePath) => void;
}

const PageRouterContext = createContext<PageRouterContextValue>({
  currentPath: '/',
  navigate: () => {},
});

export function usePageRouter() {
  return useContext(PageRouterContext);
}

/**
 * Instant 0ms client-side router provider & viewport.
 * Eliminates Next.js dev-server RSC round-trip delays when clicking navbar links,
 * while preserving real URLs, browser Back/Forward history, and SSR/static export routes.
 */
export function PageRouterProvider({ children }: { children: ReactNode }) {
  const ssrPathname = usePathname();
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => normalizePath(ssrPathname));

  // Keep in sync if Next.js pathname changes externally
  useEffect(() => {
    setCurrentPath(normalizePath(ssrPathname));
  }, [ssrPathname]);

  // Keep in sync with browser Back / Forward buttons
  useEffect(() => {
    const onPopState = () => {
      const next = normalizePath(window.location.pathname);
      setCurrentPath(next);
      document.title = PAGE_TITLES[next];
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: RoutePath) => {
    const target = normalizePath(to);
    setCurrentPath((prev) => {
      if (prev !== target) {
        window.history.pushState(null, '', target);
        document.title = PAGE_TITLES[target];
      }
      return target;
    });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath, navigate]);

  return <PageRouterContext.Provider value={value}>{children}</PageRouterContext.Provider>;
}

/**
 * Renders the active page in < 1ms from memory with zero HTTP round-trip delay.
 */
export function PageViewport() {
  const { currentPath } = usePageRouter();

  switch (currentPath) {
    case '/about':
      return <About />;
    case '/projects':
      return <Projects />;
    case '/skills':
      return <Skills />;
    case '/certificates':
      return <Certificates />;
    case '/experience':
      return <Experience />;
    case '/contact':
      return <Contact />;
    case '/':
    default:
      return <HomeView />;
  }
}

interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: RoutePath;
}

/**
 * Drop-in replacement for <Link> that switches pages in 0ms without hitting the dev server.
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { href, onClick, children, ...rest },
  ref
) {
  const { navigate } = usePageRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});
