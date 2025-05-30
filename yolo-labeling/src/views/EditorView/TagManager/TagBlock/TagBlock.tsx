import './TagBlock.css';
import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { getLabelStates } from '../../../../store/LabelState/selectors';
import { deleteLabelBox } from '../../../../store/ImageList/actions';
import { type ImageClass, type LabelBox } from '../../../../store/ImageList/type';
import { updateLabelBoxLabel, SelectCurrentWorkLabel } from '../../../../store/ImageList/actions';
interface TagBlockProps {
    ImageClass: ImageClass;
    IndexInlabelList: number;
    LabelBox: LabelBox;
}

const TagBlock: React.FC<TagBlockProps> = ({ ImageClass, IndexInlabelList, LabelBox }) => {
    const dispatch = useDispatch();
    const labelState = useSelector(getLabelStates);
    let options: { value: number, label: string }[] = []
    for (let i = 0; i < labelState.length; i++) {
        options.push({ value: i, label: labelState[i].name })
    }
    const borderW = ImageClass.workLabel == IndexInlabelList ? '10' : '3'
    const bordercolor = ImageClass.workLabel == IndexInlabelList ? 'rgb(255, 255, 255)' : 'rgb(98, 98, 98)'
    return (
        <div className="TagBlock"
            style={{
                border: borderW + "px solid " + bordercolor,
                backgroundColor: labelState[LabelBox.labelIndex].color,
            }}
            onClick={() => dispatch(SelectCurrentWorkLabel(IndexInlabelList))}
        >
            <Select
                className="TagName"
                value={options[LabelBox.labelIndex]}
                options={options}
                defaultValue={options[0]}
                onFocus={() => dispatch(SelectCurrentWorkLabel(IndexInlabelList))}
                onChange={
                    (selectedOption: any) => {
                        dispatch(updateLabelBoxLabel({ boxIndex: IndexInlabelList, labelIndex: selectedOption.value }))
                        dispatch(SelectCurrentWorkLabel(IndexInlabelList))
                    }
                }
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '100%',
                        height: '100%',
                        backgroundColor: "rgba(255, 255, 255, 0.5)",

                    })
                }}

            />
            <div className="TagDelete"
                onClick={() => {
                    dispatch(deleteLabelBox(-1))
                }}
            >
                删除</div>
        </div >
    );
};

export default TagBlock;
