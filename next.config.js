/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "";
if (isGithubActions) {
  basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/BoDeHaPham";
}

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
