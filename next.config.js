/* eslint-disable @typescript-eslint/no-var-requires */
const { withSuperjson } = require("next-superjson");

/** @type {import("next").NextConfig} */
module.exports = withSuperjson()({
    eslint: {
        dirs: ["src"],
    },

    reactStrictMode: true,

    // experimental: {
    //     largePageDataBytes: 128 * 100000,
    // },

    // SVGR
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        typescript: true,
                        icon: true,
                    },
                },
            ],
        });

        return config;
    },
});
