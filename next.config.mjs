/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` outputs a plain HTML/CSS/JS site to ./out
  output: 'export',
  // The default image optimizer needs a server, so disable it for static export
  images: { unoptimized: true },
};

export default nextConfig;
