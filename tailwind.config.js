/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [],
    theme: {
        extend: {
            animation: {
                ellipsis: "ellipsis steps(4,end) 1000ms infinite",
            },
            keyframes: {
                ellipsis: {
                    "0%": { width: 0 },
                    "100%": { width: "1em" },
                },
            },
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
            },
        },
    },
};
