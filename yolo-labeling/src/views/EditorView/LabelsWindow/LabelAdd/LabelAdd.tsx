import React from 'react'
import './LabelAdd.css'
import { useDispatch } from 'react-redux'
import { addLabelClass } from '../../../../store/LabelState/actions'

const LabelAdd: React.FC = () => {
    const dispatch = useDispatch()
    return (
        <div className="LabelAdd"
            onClick={() => dispatch(addLabelClass({  name: 'new label', color: '#000000' }))}
        >
          新增
        </div>
    )
}
export default LabelAdd