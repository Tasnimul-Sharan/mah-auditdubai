/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "mah-auditdubai.ae",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mah-auditdubai.ae",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
