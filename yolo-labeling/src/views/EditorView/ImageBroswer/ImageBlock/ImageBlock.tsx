import React, { useRef } from 'react';
import './ImageBlock.css';

export interface LabelClass {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface ImageBlockProps {
    altText: string;
    imageUrl: string;
    index: number;
    labels: LabelClass[];
    isCurrent: boolean;
    onclick: () => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ altText, imageUrl, index, labels, isCurrent, onclick }) => {
    const BlockRef = useRef<HTMLDivElement>(null);
    function generateLabelBoxes() {
        let bs: JSX.Element[] = [];
        for (let i = 0; i < labels.length; i++) {
            let label = labels[i]
            bs[i] = <div className="TagBlock"
                key={i}
                style={{
                    position: 'absolute',
                    left: label.x * 100 + "%",
                    top: label.y * 100 + "%",
                    width: label.width * 100 + "%",
                    height: label.height * 100 + "%",
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid ' + label.color.toString(),
                }}
            >
            </div>
        }
        return bs;
    }

    return (
        <div
            className={`ImageBlock`}
            onClick={onclick}
            ref={BlockRef}
            style={{
                border: isCurrent ? '5px solid white' : 'none',
            }}
        >
            <h3
                className='ImageBlockName'
                style={{
                    background: labels.length > 0 ? "green" : '',
                }}>{altText}</h3>

            <div className='ImageBlockImage' >
                <img src={imageUrl} alt={altText} className="image-block-image" width="100%" />
                {generateLabelBoxes()}
            </div>
        </div>
    );
};

export default ImageBlock;