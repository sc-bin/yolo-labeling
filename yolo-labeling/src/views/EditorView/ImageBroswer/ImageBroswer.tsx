import React, { use } from 'react';
import './ImageBroswer.css';
import ImageBlock from './ImageBlock/ImageBlock'
import ImageAdd from './ImageAdd/ImageAdd'
import { useSelector } from "react-redux";
import { getImageCount, getImageList } from "../../../store";


const ImageDisplay: React.FC = () => {
    const ImageCount = useSelector(getImageCount);
    const ImageList = useSelector(getImageList);

    let bs: JSX.Element[] = [];
    for (let i = 0; i < ImageCount; i++) {
        bs[i] = <ImageBlock altText={ImageList[i].fileName} imageUrl={ImageList[i].imagePath} index={i} />
    }
    return (
        <div className="ImageDisplay">
            <ImageAdd />
            {bs}
        </div>
    )
}

export default ImageDisplay;