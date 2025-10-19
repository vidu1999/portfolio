/** @type {import('next').NextConfig} */
//const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    //output: 'export',  
     //basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',     
  //trailingSlash: true,
  //basePath: "/portfolio",   // Ensures correct path for GitHub Pages
  //assetPrefix: "/portfolio/", // Ensures correct asset loading
   //basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
    // For GitHub Pages deployment
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  images: {
    unoptimized: true
  },
  // Add webpack configuration for Three.js
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files/',
          outputPath: 'static/files/',
        },
      },
    });
    return config;
  }
  /*images: {
    //domains: ["github-readme-stats.vercel.app"],
    unoptimized: true, 
    
  },*/
  
};

export default nextConfig;
