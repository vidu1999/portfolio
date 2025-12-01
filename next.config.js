/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio';
const basePath = isProd ? `/${repo}` : '';
const assetPrefix = isProd ? `/${repo}/` : undefined; // ensure trailing slash in production

const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
  compress: false,
};

module.exports = nextConfig;
