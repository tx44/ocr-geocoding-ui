import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from "next/document";
import { CSSProperties } from "react";

import Favicon from "@/components/atoms/Favicon/Favicon";

// TODO: Make fixed styling only for main page
// https://www.bram.us/2016/05/02/prevent-overscroll-bounce-in-ios-mobilesafari-pure-css/
const absoluteFitScreenStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    overscrollBehaviorY: "contain",
    WebkitOverflowScrolling: "touch",
} as CSSProperties;

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html
                lang="en"
                className="h-full bg-white-900"
                style={absoluteFitScreenStyle}
            >
                <Head>
                    <Favicon />
                </Head>
                <body
                    className="h-full overflow-hidden"
                    style={absoluteFitScreenStyle}
                >
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
