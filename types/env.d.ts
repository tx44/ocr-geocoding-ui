namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        VERYFI_CLIENT_ID: string;
        VERYFI_CLIENT_SECRET: string;
        VERYFI_USERNAME: string;
        VERYFI_API_KEY: string;
    }
}
