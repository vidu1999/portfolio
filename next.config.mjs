/** @type {import('next').NextConfig} */
//const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',       
  trailingSlash: true,
  images: {
    domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },
  //basePath: "/portfolio",  
  //assetPrefix: "/portfolio/" ,
  /*env: {
    NEXT_PUBLIC_BASE_PATH: "/portfolio",
  }*/
};

export default nextConfig;
