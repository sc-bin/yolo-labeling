import React from 'react';
import './ImageBlock.css';

interface ImageBlockProps {
    altText: string;
    imageUrl: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ altText, imageUrl }) => {
    return (
        <div className="ImageBlock">
            <h3>{altText}</h3>
            <img src={imageUrl} alt={altText} className="image-block-image" width="100%" />
        </div>
    );
};

export default ImageBlock;