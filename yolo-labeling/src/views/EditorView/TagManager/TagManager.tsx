import React from 'react';
import './TagManager.css';
import { getLabelList, getCurrentImage } from '../../../store/ImageList/selectors';
import { useSelector } from 'react-redux';
import TagBlock from './TagBlock/TagBlock';
const TagManager: React.FC = () => {
    const labelList = useSelector(getLabelList);
    const CurrentImage = useSelector(getCurrentImage);

    let tags: JSX.Element[] = [];
    for (let i = 0; i < labelList.length; i++) {
        tags[i] = <TagBlock
            ImageClass={CurrentImage}
            IndexInlabelList={i}
            LabelBox={labelList[i]} />
    }
    return (
        <div className="tag-manager">
            {tags}
        </div>
    )
}
export default TagManager;