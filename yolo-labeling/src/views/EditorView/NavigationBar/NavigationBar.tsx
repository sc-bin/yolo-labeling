import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavigationBar.css';
import { addImage, selectImage, exportLabels } from "../../../store/ImageList/actions";
import { getImageCount } from "../../../store/ImageList/selectors";

const NavigationBar: React.FC = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const ImageCount = useSelector(getImageCount);

    const dispatch = useDispatch();
    // 点击按钮时触发文件选择
    const handleFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        console.log('handleFileInput');
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                console.log('Selected file:', file);
                const fileURL = URL.createObjectURL(file);
                dispatch(addImage({ imageUrl: fileURL, fileName: file.name, labels: [], workLabel: -1 }));
                dispatch(selectImage(ImageCount));

            });
        }
    };
    return (
        <div className='NavigationBar'>
            <div className='NavigationBar-bottom'
                onClick={handleFileInput}
            >
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                导入
            </div>
            <div className='NavigationBar-bottom'
                onClick={() => dispatch(exportLabels())}
            >
                导出
            </div>
            <div className='NavigationBar-bottom'>
                标签
            </div>
        </div>

    )
}
export default NavigationBar;