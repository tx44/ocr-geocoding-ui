import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";
import "@/styles/map.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>OCR Geocoding UI</title>
                <meta
                    name="description"
                    content="Demo app for heat mapping addresses from receipts"
                />
                <meta
                    name="keywords"
                    content="ocr veryfi geocoding gcp api leaflet openstreetmap osm"
                />
            </Head>

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    );
};

export default App;
