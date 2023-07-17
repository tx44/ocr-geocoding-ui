import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import type { Point } from "heatmap";
import { LatLngExpression } from "leaflet";
import { CSSProperties } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const DEFAULT_COORDS: LatLngExpression = [32.96, -95.0];
const DEFAULT_ZOOM_LEVEL = 4;

const fitScreenStyle = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
} as CSSProperties;
const absoluteFitScreenStyle = {
    ...fitScreenStyle,
    position: "absolute",
} as CSSProperties;

interface IHeatMap {
    points: Point[];
}

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

const HeatMap = (props: IHeatMap) => {
    // TODO: Calculate Max Intensity on-the-fly (don't forget about useMemo hook with props.points deps)
    // const maxIntensity = 200;

    return (
        <div
            style={{
                ...absoluteFitScreenStyle,
                height: "auto",
            }}
        >
            <MapContainer
                center={DEFAULT_COORDS}
                zoom={DEFAULT_ZOOM_LEVEL}
                zoomControl={false}
                scrollWheelZoom={true}
                style={absoluteFitScreenStyle}
            >
                <HeatmapLayer
                    fitBoundsOnLoad={false}
                    fitBoundsOnUpdate={false}
                    points={props.points.map((point: Point) => [
                        point.lat,
                        point.lng,
                        0.2,
                    ])}
                    longitudeExtractor={(p: [number, number, number]) => p[1]}
                    latitudeExtractor={(p: [number, number, number]) => p[0]}
                    intensityExtractor={(p: [number, number, number]) => p[2]}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>
        </div>
    );
};

export default HeatMap;
