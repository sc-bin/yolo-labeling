import React, { useState, useRef } from 'react';
import './ImageBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentIndex } from '../../../../store/ImageList/selectors';
import { selectImage } from '../../../../store/ImageList/actions';
interface ImageBlockProps {
    altText: string;
    imageUrl: string;
    index: number;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ altText, imageUrl, index }) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const BlockRef = useRef<HTMLDivElement>(null);
    const currentIndex = useSelector(getCurrentIndex);
    const dispatch = useDispatch();
    const handleClick = () => {
        setIsSelected(!isSelected);
        dispatch(selectImage(index))

    };
    return (
        <div
            className={`ImageBlock`}
            onClick={handleClick}
            ref={BlockRef}
            style={{
                border: currentIndex === index ? '5px solid white' : 'none',
                // backgroundColor: currentIndex === index ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            }}
        >
            <h3>{altText}</h3>
            <img src={imageUrl} alt={altText} className="image-block-image" width="100%" />
        </div>
    );
};

export default ImageBlock;