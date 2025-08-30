/** @type {import('next').NextConfig} */
//const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',  
     //basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',     
  trailingSlash: true,
  basePath: "/portfolio",   // Ensures correct path for GitHub Pages
  assetPrefix: "/portfolio/", // Ensures correct asset loading
   //basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  images: {
    //domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  
};

export default nextConfig;
