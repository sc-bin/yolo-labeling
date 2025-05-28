interface point {
    x: number;
    y: number;
}
export interface LabelBox {
    name: string;
    labelIndex: number
    x: number;
    y: number;
    w: number;
    h: number;
    points: point[];
}
export interface LabelBoxPropsXYWH {
    name: string;
    label: number
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface LabelBoxPropsPoints {
    name: string;
    label: number
    points: point[];
}
export interface ImageClass {
    imagePath: string;
    fileName: string;
    labels: LabelBox[];
}