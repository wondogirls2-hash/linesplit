/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Explicit 301 (not 308) so Google treats host moves as permanent
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.paragraphsplitter.com" }],
        destination: "https://paragraphsplitter.com/:path*",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "linesplit.vercel.app" }],
        destination: "https://paragraphsplitter.com/:path*",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
