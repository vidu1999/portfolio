/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',       
  trailingSlash: true,
  images: {
    domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  basePath: "/portfolio",  // Replace with your actual GitHub repo name
  assetPrefix: isProd ? '/portfolio/' : '',
};

export default nextConfig;
