import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    allowedDevOrigins: ["169.254.146.118", "192.168.*.*"],
};

export default nextConfig;
