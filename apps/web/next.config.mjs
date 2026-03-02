/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    images: {
        remotePatterns: [
            // Payload CMS local dev
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/api/media/**",
            },
            // Payload CMS production (any https host)
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
