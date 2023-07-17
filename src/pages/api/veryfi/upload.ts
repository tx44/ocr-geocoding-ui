import Client from "@veryfi/veryfi-sdk";
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next/types";
import { createRouter } from "next-connect";

import { getVeryfiClientConfig } from "@/lib/config";
import { ErrorMessages } from "@/lib/errors";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            if (
                err !== null ||
                fields?.id?.[0] === undefined ||
                files?.blob?.[0] === undefined
            ) {
                res.status(400).end(ErrorMessages.VeryfiInternalServer);
                return reject(err);
            }

            const id = fields?.id?.[0];
            const filePath = files?.blob?.[0].path;

            const veryfiClient = new Client(...getVeryfiClientConfig());

            console.log(
                `Request process_document for ${filePath} is processing to Veryfi API`
            );

            let result = null;

            try {
                const response = await veryfiClient.process_document(filePath);
                console.log(
                    `Got response from Veryfi API for ${filePath} with id: ${response?.id}, lat: ${response?.vendor?.lat} and lng: ${response?.vendor?.lng}`
                );

                if (response) {
                    result = {
                        id,
                        veryfiId: response.id,
                        lat: response.vendor?.lat,
                        lng: response.vendor?.lng,
                    };
                }
            } catch (e) {
                res.status(500).end(ErrorMessages.VeryfiAPIError);
                return reject(e);
            }

            return resolve(result);
        });
    });

    res.status(200).json(result);
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default router.handler({
    onError: (err: unknown, _: NextApiRequest, res: NextApiResponse) => {
        console.error(err);
        res.status(500).end(ErrorMessages.VeryfiInternalServer);
    },
});
