import React from 'react';
import './ImageBroswer.css';
import ImageBlock, { type LabelClass } from './ImageBlock/ImageBlock'
import ImageAdd from './ImageAdd/ImageAdd'
import { useSelector } from "react-redux";
import { getImageList } from "../../../store/ImageList/selectors";


const ImageBroswer: React.FC = () => {
    const ImageList = useSelector(getImageList);

    let bs: JSX.Element[] = [];
    for (let i = 0; i < ImageList.length; i++) {
        let labels: LabelClass[];
        
        bs[i] = <ImageBlock key={i} altText={ImageList[i].fileName} imageUrl={ImageList[i].imageUrl} index={i} labels={labels} />
    }
    return (
        <div className="ImageBroswer">
            <div className="ImageDisplay">
                {/* <ImageAdd /> */}
                {bs}
            </div>
        </div>
    )
}

export default ImageBroswer;