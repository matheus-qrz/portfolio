import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * A queda importa só `useScroll` do Motion, mas sem isto o pacote
     * entra inteiro no bundle da página — e mais da metade dele nunca
     * roda. Vale 17 kB no First Load JS.
     */
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
