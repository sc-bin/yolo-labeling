import React from 'react';
import './ImageBroswer.css';
import ImageBlock from './ImageBlock/ImageBlock'
import ImageAdd from './ImageAdd/ImageAdd'
import { useSelector } from "react-redux";
import { getImageCount, getImageList } from "../../../store/ImageList/selectors";


const ImageBroswer: React.FC = () => {
    const ImageCount = useSelector(getImageCount);
    const ImageList = useSelector(getImageList);

    let bs: JSX.Element[] = [];
    for (let i = 0; i < ImageCount; i++) {
        bs[i] = <ImageBlock key={i} altText={ImageList[i].fileName} imageUrl={ImageList[i].imageUrl} index={i} />
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