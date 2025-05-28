interface point {
    x: number;
    y: number;
}
export interface areaSize {
    width: number;
    height: number;
}
export interface LabelBox {
    name: string;
    labelIndex: number
    top: number;
    bottom: number;
    left: number;
    right: number;
    xywh?: number[];
}

// 返回左上 右上 右下 左下 这4个点的坐标
export function edge2points(top: number, bottom: number, left: number, right: number, width: number, height: number): point[] {
    return [
        { x: left, y: top },
        { x: width - right, y: top },
        { x: width - right, y: height - bottom },
        { x: left, y: height - bottom },
    ]


}
export interface ImageClass {
    imagePath: string;
    fileName: string;
    labels: LabelBox[];
}