/** @type {import('next').NextConfig} */
//const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',       
  trailingSlash: true,
  images: {
    domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  basePath: "/portfolio",  
  assetPrefix: '/portfolio/' ,
};

export default nextConfig;
