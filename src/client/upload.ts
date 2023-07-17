import axios, { AxiosRequestConfig } from "axios";
import type { Point } from "heatmap";

export const uploadReceipt = async (blob: Blob, id: string): Promise<Point> => {
    const data = new FormData();
    data.append("blob", blob);
    data.append("id", id);

    const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
    };

    return await axios
        .post<Point>("/api/veryfi/upload", data, options)
        .then((res) => res.data);
};
