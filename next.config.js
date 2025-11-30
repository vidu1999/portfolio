/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages repo name (derived from package.json homepage or set manually)
const repo = 'portfolio';
const basePath = isProd ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: basePath,
  basePath,
  compress: false,
};

export default nextConfig;
