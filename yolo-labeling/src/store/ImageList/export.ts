import { type ImageClass } from './type';
import JSZip from 'jszip'; // 确保已安装 jszip 和 @types/jszip

const formatXYWH = (num: number): string => num.toFixed(6);

export default (ImageClassList: ImageClass[]) => {
    const zip = new JSZip();
    for (let index = 0; index < ImageClassList.length; index++) {
        const imageClass = ImageClassList[index];
        let text = "";
        for (let i = 0; i < imageClass.labels.length; i++) {
            const xywh = imageClass.labels[i].xywh;
            if (xywh != undefined) {
                text += `${imageClass.labels[i].labelIndex} ${formatXYWH(xywh[0])} ${formatXYWH(xywh[1])} ${formatXYWH(xywh[2])} ${formatXYWH(xywh[3])}`;
                text += "\n";
            }
        }

        const fileName = imageClass.fileName.replace(/\.jpg$/, '.txt');
        zip.file(fileName, text);
    }

    // 生成 ZIP 并触发下载
    zip.generateAsync({ type: "blob" }).then((content) => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_files.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
};