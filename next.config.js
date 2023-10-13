/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
// place the domain where we will place images
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
