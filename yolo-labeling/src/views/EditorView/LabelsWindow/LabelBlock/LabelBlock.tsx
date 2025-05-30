import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type LabelClass, updateLabelColor, updateLabelName, deleteLabelClass } from '../../../../store/LabelState/actions'
import { getLabelStates } from '../../../../store/LabelState/selectors'
import { getImageList } from '../../../../store/ImageList/selectors'
import { deleteLabelBox } from '../../../../store/ImageList/actions'
import './LabelBlock.css'
interface LabelBlockProps {
    labelIndex: number;
    label: LabelClass;
}

const LabelsWindowBlock: React.FC<LabelBlockProps> = ({ labelIndex, label }) => {
    const dispatch = useDispatch()
    const labelStates = useSelector(getLabelStates)
    const ImageList = useSelector(getImageList)
    const colorRef = useRef<HTMLInputElement>(null)
    const editableTextRef = useRef<HTMLDivElement>(null)
    const deleteLabel = () => {
        if (labelStates.length - 1 == labelIndex) {
            console.log("last one")
            for (let i = 0; i < ImageList.length - 1; i++) {
                const labels = ImageList[i].labels
                for (let j = 0; j < labels.length; j++) {
                    // let label= {...labels[j]}
                    if (labels[j].labelIndex == labelIndex) {
                        dispatch(deleteLabelBox(i, j))
                    }
                }

            }
        }
        dispatch(deleteLabelClass(labelIndex))
    }
    const handleColorClick = () => {
        if (colorRef.current) {
            colorRef.current.click()
        }
    }

    const handleEditComplete = () => {
        if (editableTextRef.current) {
            const updatedText = editableTextRef.current.innerText
            dispatch(updateLabelName({ index: labelIndex, name: updatedText }))
        }
    }


    return (<> <div className="LabelsWindow-block" key={labelIndex}>
        <div className="LabelsWindow-block-num"> {labelIndex} </div>
        <div
            className="LabelsWindow-block-color"
            style={{ backgroundColor: label.color }}
            onClick={handleColorClick}
        ></div>
        <input
            type="color"
            id={`colorPicker-${labelIndex}`}
            style={{ display: 'none' }}
            onChange={(event) => dispatch(updateLabelColor({ index: labelIndex, color: event.target.value }))}
            ref={colorRef}
        />
        <div className="LabelsWindow-block-name"
            contentEditable
            onBlur={handleEditComplete}
            ref={editableTextRef}
        >
            {label.name}
        </div>
        <div className="LabelsWindow-block-delete"
            onClick={deleteLabel}
        >
            删除
        </div>
    </div></>)
}

export default LabelsWindowBlock