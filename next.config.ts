import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Home dir has a stray package-lock.json; pin Turbopack to this app.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
