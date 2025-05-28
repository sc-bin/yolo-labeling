import React from 'react';
import './TagManager.css';
import { getLabelList } from '../../../store/LabelState/selectors';
import { useSelector } from 'react-redux';
import TagBlock from './TagBlock/TagBlock';
const TagManager: React.FC = () => {
    const labelList = useSelector(getLabelList);
    let tags: JSX.Element[] = [];
    for (let i = 0; i < labelList.length; i++) {
        tags[i] = <TagBlock labelIndex={labelList[i].labelIndex} IndexInlabelList={i} />
    }
    return (
        <div className="tag-manager">
            {tags}
        </div>
    )
}
export default TagManager;