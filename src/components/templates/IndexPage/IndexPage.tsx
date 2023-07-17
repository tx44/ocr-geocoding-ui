import type { Point } from "heatmap";
import dynamic from "next/dynamic";

import { FileItem } from "@/lib/file";

import Attach from "@/components/atoms/Attach/Attach";

const HeatMap = dynamic(
    () => import("@/components/organisms/HeatMap/HeatMap"),
    { ssr: false }
);

interface IIndexPageTemplate {
    files: FileItem[];
    points: Point[];
    onChange: (file: FileItem[]) => void;
    onSave: (file: File, fileId: string) => Promise<void>;
    onRemove: (file: FileItem) => Promise<boolean>;
}

const IndexPageTemplate = (props: IIndexPageTemplate) => {
    return (
        <main>
            <div className="absolute top-0 left-0 right-0 bottom-48 z-10">
                <HeatMap points={props.points} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 h-48 bg-white-900 pt-2 pb-4 shadow-xl">
                <Attach
                    multiple={true}
                    value={props.files}
                    rootClassName="h-full overflow-auto px-6"
                    subLabel="Upload receipts and get a heatmap coverage"
                    onChange={props.onChange}
                    onSave={props.onSave}
                    onRemove={props.onRemove}
                />
            </div>
        </main>
    );
};

export default IndexPageTemplate;
