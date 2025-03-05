/** @type {import('next').NextConfig} */
//const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',       
  trailingSlash: true,
  basePath: "/(portfolio)",   // Ensures correct path for GitHub Pages
  assetPrefix: "/(portfolio)/", // Ensures correct asset loading
  images: {
    domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  
};

export default nextConfig;
