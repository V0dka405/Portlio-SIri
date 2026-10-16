interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Lightweight CSS-driven reveal wrapper — zero JS runtime or hydration delay. */
export default function Reveal({ children, className = '' }: RevealProps) {
  return <div className={`animate-fade-up ${className}`}>{children}</div>;
}
