import React from 'react';
import './LabelingArea.css'
import { useSelector } from "react-redux";
import { getCurrentImage } from "../../../store";

const LabelingArea: React.FC = () => {
    
    const CurrentImage = useSelector(getCurrentImage);
    console.log(CurrentImage);
    return (
        <div className="LabelingArea">
            <img src={CurrentImage.imagePath} alt={CurrentImage.fileName} width="100%" />
        </div>
    )
}
export default LabelingArea;