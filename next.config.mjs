import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  webpack(config) {
    config.resolve.alias['@public'] = new URL('./public', import.meta.url).pathname;
    return config;
  },
};

export default withVanillaExtract(nextConfig);
