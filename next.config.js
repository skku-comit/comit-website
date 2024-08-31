/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_REFRENCE_ID}.supabase.co`,
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
