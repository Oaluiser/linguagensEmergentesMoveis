/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chimexmoveis.com.br",
        port: "",
        pathname: "/**/*"
      },
      {
        protocol: "https",
        hostname: "panoverse-cdn.com.br",
        port: "",
        pathname: "/**/*"
      },
      {
        protocol: "https",
        hostname: "product-hub-prd.madeiramadeira.com.br",
        port: "",
        pathname: "/**/*"
      }
    ]
  }
}

export default nextConfig
