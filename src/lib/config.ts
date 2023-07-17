/**
 * Prepares config for initializing Veryfi OCR API Client
 *
 * @returns {[string, string, string, string]} Returns stored at .env credentials for Veryfi API
 */
export const getVeryfiClientConfig = (): [string, string, string, string] => {
    if (
        process.env.VERYFI_CLIENT_ID &&
        process.env.VERYFI_CLIENT_SECRET &&
        process.env.VERYFI_USERNAME &&
        process.env.VERYFI_API_KEY
    ) {
        return [
            process.env.VERYFI_CLIENT_ID,
            process.env.VERYFI_CLIENT_SECRET,
            process.env.VERYFI_USERNAME,
            process.env.VERYFI_API_KEY,
        ];
    }
    throw new Error("Please provide credentials for Veryfi API at .env");
};
