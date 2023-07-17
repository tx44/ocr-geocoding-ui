declare module "heatmap" {
    type Point = {
        id: string;
        veryfiId: number;
        lat: number;
        lng: number;
        total: number;
        intensity?: number;
    };
}
