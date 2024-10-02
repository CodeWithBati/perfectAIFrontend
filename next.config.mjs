/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "localhost:3000/",
      },
    ],
    domains: [
      "myperfectai.ams3.cdn.digitaloceanspaces.com",
      "storage.googleapis.com",
      "spogit.ams3.cdn.digitaloceanspaces.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle .html files as raw assets
    config.module.rules.push({
      test: /\.html$/,
      type: 'asset/source',
    });

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
