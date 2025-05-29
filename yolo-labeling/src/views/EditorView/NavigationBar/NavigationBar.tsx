import React from 'react';
import { useDispatch } from 'react-redux';
import './NavigationBar.css';
import { exportLabels } from "../../../store/ImageList/actions";
import { selectView, ViewsEnum } from "../../../store/EditorViews/actions";

const NavigationBar: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className='NavigationBar'>
            <div className='NavigationBar-bottom'
                onClick={() => dispatch(selectView(ViewsEnum.UploadWindow))}
            >
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