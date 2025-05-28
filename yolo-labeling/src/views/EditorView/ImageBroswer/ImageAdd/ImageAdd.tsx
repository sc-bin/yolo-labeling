import React from 'react';
import './ImageAdd.css'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getImageCount } from "../../../../store/ImageList/selectors";
import { addImage, selectImage } from "../../../../store/ImageList/actions";

const ImageAdd: React.FC = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const ImageCount = useSelector(getImageCount);

    // 点击按钮时触发文件选择
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                console.log('Selected file:', file);
                const fileURL = URL.createObjectURL(file);
                dispatch(addImage({ imagePath: fileURL, fileName: file.name, labels: [] }));
                dispatch(selectImage(ImageCount));

            });
        }
    };
    return (
        <div className="ImageAdd" onClick={handleButtonClick}>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple // 允许多选
            />
            <h3>添加图片</h3>
        </div>
    );
}
export default ImageAdd;