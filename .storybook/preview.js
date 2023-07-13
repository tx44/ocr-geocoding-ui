import NextImage from "next/image";

import "../src/styles/globals.css";

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => <NextImage {...props} unoptimized />,
});

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    previewTabs: {
        "storybook/docs/panel": { index: -1 },
    },
};
