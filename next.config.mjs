/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Host redirects (www / preview → apex HTTPS 301) live in vercel.json
  // so the edge returns a true 301, not Next's default 308.
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
      // Allow third-party sites to iframe the embed widget
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
