/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',       
  trailingSlash: true,
  images: {
    domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  basePath: "/portfolio",  // Replace with your actual GitHub repo name
  assetPrefix: "/portfolio/",
};

export default nextConfig;
