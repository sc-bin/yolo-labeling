import React, { useState, useRef } from 'react';
import './ImageBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentIndex, getImageList } from '../../../../store/ImageList/selectors';
import { selectImage } from '../../../../store/ImageList/actions';
import { getLabelStates } from "../../../../store/LabelState/selectors";

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
}

const ImageBlock: React.FC<ImageBlockProps> = ({ altText, imageUrl, index, labels }) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const BlockRef = useRef<HTMLDivElement>(null);
    const currentIndex = useSelector(getCurrentIndex);
    const ImageList = useSelector(getImageList);
    const LabelState = useSelector(getLabelStates);

    const dispatch = useDispatch();

    function generateLabelBoxes() {
        let bs: JSX.Element[] = [];
        let labels = ImageList[index].labels;
        for (let i = 0; i < labels.length; i++) {
            let xywh = labels[i].xywh
            if (xywh != null) {
                bs[i] = <div className="TagBlock"
                    key={i}
                    style={{
                        position: 'absolute',
                        left: xywh[0] * 100 + "%",
                        top: xywh[1] * 100 + "%",
                        width: xywh[2] * 100 + "%",
                        height: xywh[3] * 100 + "%",
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid ' + LabelState[labels[i].labelIndex].color.toString(),
                    }}
                >
                </div>
            }
        }
        return bs;
    }


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
            }}
        >
            <h3
                className='ImageBlockName'
                style={{
                    background: ImageList[index].labels.length > 0 ? "green" : '',
                }}>{altText}</h3>

            <div className='ImageBlockImage' >
                <img src={imageUrl} alt={altText} className="image-block-image" width="100%" />
                {generateLabelBoxes()}
            </div>
        </div>
    );
};

export default ImageBlock;