// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [],
    theme: {
        extend: {
            colors: {
                black: {
                    50: "rgba(36, 36, 36, .04)",
                    100: "rgba(36, 36, 36, .08)",
                    200: "rgba(36, 36, 36, .16)",
                    300: "rgba(36, 36, 36, .24)",
                    400: "rgba(36, 36, 36, .32)",
                    500: "rgba(36, 36, 36, .48)",
                    600: "rgba(36, 36, 36, .64)",
                    700: "rgba(36, 36, 36, .80)",
                    800: "rgba(36, 36, 36, .90)",
                    900: "rgba(36, 36, 36, 1)",
                },
                white: {
                    50: "rgba(255, 255, 255, .04)",
                    100: "rgba(255, 255, 255, .08)",
                    200: "rgba(255, 255, 255, .16)",
                    300: "rgba(255, 255, 255, .24)",
                    400: "rgba(255, 255, 255, .32)",
                    500: "rgba(255, 255, 255, .48)",
                    600: "rgba(255, 255, 255, .64)",
                    700: "rgba(255, 255, 255, .80)",
                    800: "rgba(255, 255, 255, .90)",
                    900: "rgba(255, 255, 255, 1)",
                },
                gray: {
                    50: "rgba(251, 252, 253, 1)",
                    100: "rgba(244, 247, 250, 1)",
                    150: "rgba(230, 236, 244, 1)",
                    200: "rgba(217, 224, 235, 1)",
                },
            },

            boxShadow: {
                sm: "0 1px 2px 0 rgba(0, 0, 0, .08)",
                DEFAULT:
                    "0 1px 4px 0 rgba(0, 0, 0, .12), 0 1px 3px -1px rgba(0, 0, 0, .12)",
                lg: "0px 8px 24px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.01)",
                xl: "0px 8px 24px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.01)",
                "2xl": "0px 8px 24px rgba(0, 0, 0, 0.32), 0px 0px 1px rgba(0, 0, 0, 0.01)",
                none: "none",
                innerBorder1: "inset 0px 0px 0px 1px",
                innerBorder2: "inset 0px 0px 0px 2px",
                outerBorder2: "0px 0px 0px 2px",
            },

            backdropBlur: {
                "2xl": "32px",
            },

            transitionDuration: {
                240: "240ms",
                DEFAULT: "240ms",
            },

            transitionTimingFunction: {
                DEFAULT: "ease-out",
            },

            borderRadius: {
                none: "0",
                sm: "0.125rem" /* 2px */,
                DEFAULT: "0.25rem" /* 4px */,
                md: "0.375rem" /* 6px */,
                lg: "0.5rem" /* 8px */,
                xl: "0.75rem" /* 12px */,
                "2xl": "1rem" /* 16px */,
                "3xl": "1.25rem" /* 20px */,
                "4xl": "1.5rem" /* 24px */,
                "5xl": "2.25rem" /* 36px */,
                full: "9999px",
            },

            fontSize: {
                "2xs": ["0.625rem", "0.9rem"],
            },

            screens: {
                "2xsmall": "320px",
                xsmall: "512px",
                small: "1024px",
                medium: "1280px",
                large: "1440px",
                xlarge: "1680px",
                "2xlarge": "1920px",
            },
        },
    },
};
