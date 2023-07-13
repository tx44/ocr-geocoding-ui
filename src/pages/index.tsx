import { Point } from "heatmap";
import * as React from "react";

import IndexPageTemplate from "@/components/templates/IndexPage/IndexPage";

const samplePoints: Point[] = [
    [42.536457, -70.985786, 1],
    [42.328674, -72.664658, 0.15],
    [42.341042, -71.217133, 0.15],
    [42.810356, -70.893875, 0.15],
    [41.638409, -70.941208, 0.15],
    [42.419331, -71.11972, 0.15],
    [42.429752, -71.071022, 0.15],
];

const IndexPage = () => {
    return <IndexPageTemplate points={samplePoints} />;
};

export default IndexPage;
