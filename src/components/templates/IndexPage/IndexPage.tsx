import dynamic from "next/dynamic";

import Attach from "@/components/atoms/Attach/Attach";

const HeatMap = dynamic(
    () => import("@/components/organisms/HeatMap/HeatMap"),
    { ssr: false }
);

interface IIndexPageTemplate {
    points: [number, number, number][];
}

const IndexPageTemplate = (props: IIndexPageTemplate) => {
    return (
        <main>
            <div className="absolute top-0 left-0 right-0 bottom-48">
                <HeatMap points={props.points} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-48 overflow-auto bg-white-900 px-6 pt-2 pb-4">
                <Attach
                    multiple={true}
                    rootClassName="h-full"
                    subLabel="Upload receipts and get a heatmap coverage"
                />
            </div>
        </main>
    );
};

export default IndexPageTemplate;
