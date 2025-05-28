import './TagBlock.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLabelStates } from '../../../../store/LabelState/selectors';
import { deleteLabelBox } from '../../../../store/ImageList/actions';
interface TagBlockProps {
    labelIndex: number;
    IndexInlabelList: number;
}

const TagBlock: React.FC<TagBlockProps> = ({ labelIndex, IndexInlabelList }) => {
    const dispatch = useDispatch();
    const labelState = useSelector(getLabelStates);
    const handleClick = () => {
        console.log('TagBlock clicked', IndexInlabelList);
        dispatch(deleteLabelBox(IndexInlabelList))
    };

    return (
        <div className="TagBlock" >
            <div className="TagColor" style={{ backgroundColor: labelState[labelIndex].color }}></div>
            <div className="TagName">{labelState[labelIndex].name}</div>
            <div className="TagDelete" onClick={handleClick}>删除</div>
        </div>
    );
};

export default TagBlock;
