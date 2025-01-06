import type { NextConfig } from "next";
import withPWA from "./lib/next-pwa-wrapper.cjs" 


const nextConfig: NextConfig = {
  compiler:{
    removeConsole: process.env.NODE_ENV !== "development"
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.clerk.com'], // Add the required domain here
  },
};

const PWAWrapper = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})
export default PWAWrapper(nextConfig);
