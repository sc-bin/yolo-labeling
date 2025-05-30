import React from 'react'
import './LabelsWindow.css'
import { getLabelStates } from '../../../store/LabelState/selectors'
import { useSelector } from 'react-redux'
import LabelsWindowBlock from './LabelBlock/LabelBlock'
import LabelAdd from './LabelAdd/LabelAdd'
const LabelsWindow: React.FC = () => {
    let blocks: JSX.Element[] = []
    const labelStates = useSelector(getLabelStates)

    for (let i = 0; i < labelStates.length; i++) {

        blocks[i] = <LabelsWindowBlock labelIndex={i} label={labelStates[i]} />
    }

    return (
        <div className="LabelsWindow">
            <div className="LabelsWindow-desc">
                <p>标签管理</p>
            </div>
            <div className="LabelsWindow-indide">
                {blocks}
                <LabelAdd />
            </div>
        </div>
    )
}

export default LabelsWindow