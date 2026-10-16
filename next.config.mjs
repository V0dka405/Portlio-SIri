/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export only during production build (`next build` -> ./out).
  // Keeping it undefined in `next dev` prevents stale SSR HTML caching & hydration mismatches.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
