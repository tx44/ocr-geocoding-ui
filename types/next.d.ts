/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

import type { NextComponentType, NextPageContext, NextApiRequest } from "next";
import type { Router } from "next/router";

declare module "next/app" {
    type AppProps<P = Record<string, unknown>> = {
        Component: NextComponentType<NextPageContext, any, P>;
        router: Router;
        __N_SSG?: boolean;
        __N_SSP?: boolean;
        pageProps: P & {
            /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
            session?: Session;
        };
    };
}
