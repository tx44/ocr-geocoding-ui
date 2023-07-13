/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    /** Expose public folder to storybook as static */
    staticDirs: ["../public"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            /**
             * Fix Storybook issue with PostCSS@8
             * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
             */
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    framework: "@storybook/react",
    core: {
        builder: "webpack5",
    },
    webpackFinal: async (config) => {
        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                // GOTCHA: This plugin does not support `references` TS option yet, so specify tsconfig.json with paths explicitly
                // https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/44
                // https://github.com/dividab/tsconfig-paths-webpack-plugin/pull/79
                configFile: "./tsconfig.json",
            }),
        ];

        const rules = config.module.rules;
        const assetResourcesRule = rules.find(
            (item) => item.type === "asset/resource"
        );

        assetResourcesRule.test =
            /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

        config.module.rules.push({
            test: /\.svg$/i,
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

        config.module.rules.push({
            test: /\.(woff|woff2)$/i,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            ],
            include: path.resolve(__dirname, "../"),
        });

        /**
         * Fixes font import with /
         * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
         */
        config.resolve.roots = [
            path.resolve(__dirname, "../public"),
            "node_modules",
        ];

        /**
         * Fixes ModuleNotFoundError: Module not found: Error: Can't resolve 'util'
         * @see https://github.com/storybookjs/storybook/issues/18319
         */
        config.resolve.fallback = {
            util: false,
            assert: false,
            path: false,
        };

        return config;
    },
};
