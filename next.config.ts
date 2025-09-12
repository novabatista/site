import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://file-inpeace-*.inpeaceapp.com/**'),
      new URL('https://i.ytimg.com/vi/*/**'),
    ],
  },
};

export default nextConfig;
