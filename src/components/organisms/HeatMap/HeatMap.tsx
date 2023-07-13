import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { Point } from "heatmap";
import { LatLngExpression } from "leaflet";
import { CSSProperties } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const DEFAULT_COORDS: LatLngExpression = [38.96, -98.6];
const DEFAULT_ZOOM_LEVEL = 5;

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
                    points={props.points}
                    longitudeExtractor={(point: Point) => point[1]}
                    latitudeExtractor={(point: Point) => point[0]}
                    intensityExtractor={(point: Point) => point[2]}
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
