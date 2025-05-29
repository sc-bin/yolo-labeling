interface point {
    x: number;
    y: number;
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
export function edge2points(label: LabelBox, width: number, height: number): point[] {
    return [
        { x: label.left, y: label.top },
        { x: width - label.right, y: label.top },
        { x: width - label.right, y: height - label.bottom },
        { x: label.left, y: height - label.bottom },
    ]
}
export interface ImageClass {
    imageUrl: string; //可用于显示的链接
    fileName: string; //图片的文件名
    labels: LabelBox[]; //保存在该图片上绘制的所有标签盒子
    workLabel: number; //当前正在绘制的标签索引
}

export interface InitialState {
    Imagelist: ImageClass[];
    currentIndex: number;
    currentImageFile: ImageClass;
    count: number;
}