import { DocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createId } from "@paralleldrive/cuid2";
import React, { ReactNode, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

import clsxm from "@/lib/clsxm";
import { FileItem } from "@/lib/file";

interface AttachProps {
    icon?: ReactNode;
    subLabel?: string;
    accept?: Accept;
    restriction?: string;
    multiple?: boolean;
    value?: FileItem[];
    rootClassName?: string;
    onChange?: (files: FileItem[]) => void;
    onSave?: (file: File, fileId: string) => Promise<void>;
    onRemove?: (file: FileItem) => Promise<boolean>;
}

const Attach = (props: AttachProps) => {
    const [isDragEnter, setIsDragEnter] = useState(false);
    const [files, setFiles] = useState<FileItem[]>(props.value ?? []);

    useEffect(() => {
        if (props.value !== undefined) {
            setFiles(props.value);
        }
    }, [props.value]);

    const getDefaultFile = (file: File) => {
        return {
            name: file.name,
            src: URL.createObjectURL(file),
            type: file.type,
        };
    };

    const handleSave = async (file: File, fileId: string) => {
        if (props.onSave !== undefined) {
            return props.onSave(file, fileId);
        }

        return Promise.resolve(getDefaultFile(file));
    };

    const handleRemove = async (file: FileItem) => {
        if (props.onRemove !== undefined) {
            await props.onRemove(file);
        }

        const newFiles = files.filter((item) => item.src !== file.src);
        setFiles(newFiles);

        if (props.onChange !== undefined) {
            props.onChange(newFiles);
        }
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const newFiles = [...files];

        for (const file of acceptedFiles) {
            const fileId = createId();
            newFiles.push({
                id: fileId,
                src: getDefaultFile(file).src,
                name: file.name,
                type: file.type,
            });

            handleSave(file, fileId);
        }

        if (props.onChange !== undefined) {
            props.onChange(newFiles);
        } else {
            setFiles(newFiles);
        }

        setIsDragEnter(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        multiple: props.multiple,
        accept: props.accept ?? {},
        onDragEnter: () => setIsDragEnter(true),
        onDragLeave: () => setIsDragEnter(false),
        onDrop: handleDrop,
    });

    return (
        <div className={props.rootClassName}>
            <div
                {...getRootProps({
                    className: clsxm(
                        "group min-h-[56px] py-3.5 flex justify-center px-4 flex-col items-center cursor-pointer dropzone transition duration-default ease-in-out border border-black-200 border-dashed rounded-2xl",
                        isDragEnter && "bg-black-200",
                        files.length === 0 && "h-full"
                    ),
                })}
            >
                <input {...getInputProps()} />
                {isDragEnter && <DocumentIcon className="absolute h-4 w-4" />}

                {props.icon && <div className="mb-2">{props.icon}</div>}
                <p
                    className={clsxm(
                        "w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base",
                        isDragEnter && "invisible"
                    )}
                >
                    <span className="text-blue-600 group-hover:text-blue-800">
                        Choose files
                    </span>{" "}
                    or drag and drop them here
                    {props.restriction && (
                        <p className="mt-1 text-center text-sm text-black-600">
                            {props.restriction}
                        </p>
                    )}
                </p>
                {props.subLabel && (
                    <div
                        className={clsxm(
                            "mt-2 text-sm text-black-300",
                            isDragEnter && "invisible"
                        )}
                    >
                        {props.subLabel}
                    </div>
                )}
            </div>
            {Array.isArray(files) && files.length > 0 && (
                <div>
                    <ul className="ml-4 mt-4">
                        {files.map((file) => {
                            return (
                                <li
                                    key={file.name}
                                    className="mb-2.5 flex h-8 items-center justify-center"
                                >
                                    {file.type.includes("image") ? (
                                        <span className="flex-shrink-0 px-1">
                                            <img
                                                alt={file.name}
                                                className="h-6"
                                                src={file.src}
                                            />
                                        </span>
                                    ) : (
                                        <DocumentIcon className="h-4 w-4 flex-shrink-0 rounded-xl bg-black-50 p-1" />
                                    )}

                                    <span className="flex items-baseline">
                                        <span className="mx-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-800">
                                            {file.name}
                                        </span>
                                        {file.isUploading && (
                                            <span className="text-xs text-black-400 after:inline-block after:w-0 after:animate-ellipsis after:overflow-hidden after:align-bottom after:content-['\2026']">
                                                Processing
                                            </span>
                                        )}
                                        {file.error && (
                                            <span className="text-xs text-red-400">
                                                {file.error ??
                                                    "Error on processing"}
                                            </span>
                                        )}
                                    </span>

                                    <TrashIcon
                                        className="ml-auto h-5 w-5 flex-shrink-0 cursor-pointer"
                                        onClick={() => handleRemove(file)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Attach;
