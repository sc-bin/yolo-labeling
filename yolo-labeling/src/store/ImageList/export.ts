import { type ImageClass } from './type'

const formatXYWH = (num: number): string => num.toFixed(6);

export default (ImageClass: ImageClass) => {
    let text = "";

    for (let i = 0; i < ImageClass.labels.length; i++) {
        const xywh = ImageClass.labels[i].xywh;
        if (xywh != undefined) {
            text += `${ImageClass.labels[i].labelIndex} ${formatXYWH(xywh[0])} ${formatXYWH(xywh[1])} ${formatXYWH(xywh[2])} ${formatXYWH(xywh[3])}`;
            text += "\n";
        }
    }


    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = ImageClass.fileName.replace(/\.jpg$/, '.txt'); // 设置下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // 清理内存
};