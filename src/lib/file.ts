export const FileItemId = Symbol("FileItemId");

export interface FileItem {
    [FileItemId]?: number;
    src?: string;
    name: string;
    type: string;
    isUploading?: boolean;
}
