import Client from "@veryfi/veryfi-sdk";
import { NextApiRequest, NextApiResponse } from "next/types";
import { createRouter } from "next-connect";

import { getVeryfiClientConfig } from "@/lib/config";
import { ErrorMessages } from "@/lib/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const veryfiClient = new Client(...getVeryfiClientConfig());
        const id = req.query.id;

        console.log(
            `Request delete_document for id: ${id} is processing to Veryfi API`
        );

        await veryfiClient.delete_document(id);
        console.log(
            `Got successful response from Veryfi API for deleting document with id: ${id}`
        );

        return res.status(200).end();
    } catch (err) {
        return res.status(500).end(ErrorMessages.VeryfiAPIError);
    }
});

export default router.handler({
    onError: (err: unknown, _: NextApiRequest, res: NextApiResponse) => {
        console.error(err);
        res.status(500).end(ErrorMessages.VeryfiInternalServer);
    },
});
