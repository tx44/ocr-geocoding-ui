import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { Point } from "heatmap";
import { useState } from "react";

import { FileItem } from "@/lib/file";

import IndexPageTemplate from "@/components/templates/IndexPage/IndexPage";

import { removeReceipt } from "@/client/removeReceipt";
import { uploadReceipt } from "@/client/uploadReceipt";

const IndexPage = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [points, setPoints] = useState<Point[]>([]);

    const uploadReceiptMutation = useMutation<
        void,
        unknown,
        { file: Blob; fileId: string },
        () => void
    >(async (data) => {
        setFiles((files) =>
            files.map((file) => {
                if (file.id === data.fileId) {
                    return {
                        ...file,
                        isUploading: true,
                    };
                }
                return file;
            })
        );

        try {
            const result = await uploadReceipt(data.file, data.fileId);
            if (!!result.lat && !!result.lng) {
                setPoints((x) => [
                    ...x,
                    {
                        ...result,
                    },
                ]);
                setFiles((files) =>
                    files.map((file) => {
                        if (file.id === result.id) {
                            return {
                                ...file,
                                isUploading: false,
                            };
                        }
                        return file;
                    })
                );
            } else {
                setFiles((files) =>
                    files.map((file) => {
                        if (file.id === result.id) {
                            return {
                                ...file,
                                isUploading: false,
                                error: "Can't extract data of vendor's coordinates",
                            };
                        }
                        return file;
                    })
                );
            }
        } catch (err) {
            setFiles((files) =>
                files.map((file) => {
                    const error = err as AxiosError;
                    if (file.id === data.fileId && error.response?.data) {
                        return {
                            ...file,
                            isUploading: false,
                            error: error.response.data.toString(),
                        };
                    }
                    return file;
                })
            );
        }
    });

    const handleReceiptChange = (files: FileItem[]) => {
        setFiles(files);
    };
    const handleReceiptUpload = (file: Blob, fileId: string): Promise<void> => {
        return uploadReceiptMutation.mutateAsync({
            file,
            fileId,
        });
    };
    const handleReceiptRemove = (currentFile: FileItem): Promise<void> => {
        setFiles((files) => files.filter((file) => currentFile.id !== file.id));

        let pointId;
        const newPoints = points.filter((point) => {
            if (currentFile.id === point.id) {
                pointId = point.veryfiId;
            }
            return currentFile.id !== point.id;
        });
        setPoints(newPoints);

        if (pointId === undefined) {
            return Promise.reject();
        }

        return removeReceipt(pointId);
    };

    return (
        <IndexPageTemplate
            files={files}
            points={points}
            onChange={handleReceiptChange}
            onSave={handleReceiptUpload}
            onRemove={handleReceiptRemove}
        />
    );
};

export default IndexPage;
