import React from 'react';
import './ImageBroswer.css';
import ImageBlock, { type LabelClass } from './ImageBlock/ImageBlock'
import ImageAdd from './ImageAdd/ImageAdd'
import { useSelector,useDispatch } from "react-redux";
import { getImageList } from "../../../store/ImageList/selectors";
import { getLabelStates } from "../../../store/LabelState/selectors";
import { getCurrentIndex } from '../../../store/ImageList/selectors';
import { selectImage } from '../../../store/ImageList/actions';

const ImageBroswer: React.FC = () => {
    const dispatch = useDispatch();
    const ImageList = useSelector(getImageList);
    const LabelStates = useSelector(getLabelStates);
    const currentIndex = useSelector(getCurrentIndex);

    let bs: JSX.Element[] = [];
    for (let i = 0; i < ImageList.length; i++) {
        let labels: LabelClass[] = [];
        for (let j = 0; j < ImageList[i].labels.length; j++) {
            const labelIndex = ImageList[i].labels[j].labelIndex
            const xywh = ImageList[i].labels[j].xywh
            if (xywh) {
                labels.push({
                    x: xywh[0],
                    y: xywh[1],
                    width: xywh[2],
                    height: xywh[3],
                    color: LabelStates[labelIndex].color
                })
            }

        }

        bs[i] = <ImageBlock key={i}
            altText={ImageList[i].fileName} imageUrl={ImageList[i].imageUrl}
            index={i} labels={labels}
            isCurrent={i === currentIndex} 
            onclick={() => dispatch(selectImage(i))} />
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