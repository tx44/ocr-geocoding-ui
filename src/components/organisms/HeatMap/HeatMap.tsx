import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import type { Point } from "heatmap";
import { LatLngExpression } from "leaflet";
import { CSSProperties, useMemo } from "react";
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
    /**
     * Calculate intensity param on-the-fly
     */
    const points = useMemo(() => {
        const maxTotal = Math.max(...props.points.map((point) => point.total));
        return props.points.map((point) => {
            return {
                ...point,
                intensity: point.total / maxTotal ?? 1,
            };
        });
    }, [props.points]);

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
                    points={points.map((point: Point) => [
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
