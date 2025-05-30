import './UploadWindow.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getImageCount } from "../../../store/ImageList/selectors";
import { addImage, selectImage } from "../../../store/ImageList/actions";

const UploadView: React.FC = () => {
    const dispatch = useDispatch();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const ImageCount = useSelector(getImageCount);

    const handleFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const processFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            const fileURL = URL.createObjectURL(file);
            dispatch(addImage({ imageUrl: fileURL, fileName: file.name, labels: [], workLabel: -1 }));
            dispatch(selectImage(ImageCount));
        });
    };


    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // 必须阻止默认行为才能触发 drop 事件
    };
    const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            processFiles(files);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation(); // 阻止冒泡，避免其他事件干扰
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };
    return (

        <div className='UploadView'
            onClick={handleFileInput}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileAdd}
            />
            <img src='box-opened.png' />
            <p>拖动文件到此处自动上传</p>
            <p>或</p>
            <p>点击此处选择本地文件</p>

        </div>
    );
};
export default UploadView