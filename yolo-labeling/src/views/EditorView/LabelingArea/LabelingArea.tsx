import React, { useEffect, useRef } from 'react';
import './LabelingArea.css'
import { useSelector, useDispatch } from "react-redux";
import { getCurrentImage } from "../../../store/ImageList/selectors";
import { addLabelBox, updateLabelBox } from "../../../store/ImageList/actions";
import { type LabelBox, edge2points } from "../../../store/ImageList/type";
import { getLabelList, getLabelStates } from "../../../store/LabelState/selectors";
const LabelingArea: React.FC = () => {
    const LabelState = useSelector(getLabelStates);

    const CurrentImage = useSelector(getCurrentImage);
    const LabelList = useSelector(getLabelList);
    const labelingAreaRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    let nearLabelIndex = -1;
    let nearPointIndex = -1;
    let nearDistance = -1;
    let nearestLbael: LabelBox = { name: " ", labelIndex: 0, left: 0, top: 0, right: 0, bottom: 0, }
    function getAreaHW(): { height: number, width: number } {
        if (labelingAreaRef.current != undefined)
            return {
                height: labelingAreaRef.current.offsetHeight,
                width: labelingAreaRef.current.offsetWidth
            }
        return {
            height: 0,
            width: 0
        }
    }
    const relativeXY = (event: React.MouseEvent<HTMLDivElement> | MouseEvent): { x: number, y: number } => {

        const rect = labelingAreaRef.current?.getBoundingClientRect();
        if (rect != null) {
            let relativeX = event.clientX - rect.left;
            let relativeY = event.clientY - rect.top;
            return { x: relativeX, y: relativeY };
        }
        else
            return { x: 0, y: 0 };
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // 阻止默认的拖拽行为
        const { x: relativeX, y: relativeY } = relativeXY(event);
        const { height: areaHeight, width: areaWidth } = getAreaHW();
        nearLabelIndex = -1;
        nearPointIndex = -1;
        nearDistance = -1;
        for (let i = 0; i < LabelList.length; i++) {

            let npoint = -1;
            let minDistance = Infinity;
            let points = edge2points(LabelList[i].top, LabelList[i].bottom, LabelList[i].left, LabelList[i].right, areaWidth, areaHeight)
            for (let j = 0; j < points.length; j++) {

                const px = points[j].x
                const py = points[j].y
                const distance = Math.sqrt(
                    Math.pow(relativeX - px, 2) +
                    Math.pow(relativeY - py, 2)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    npoint = j;
                }
            }

            if (nearDistance === -1) {
                nearLabelIndex = i;
                nearPointIndex = npoint;
                nearDistance = minDistance;
            }
            if (minDistance < nearDistance) {
                nearLabelIndex = i;
                nearPointIndex = npoint;
                nearDistance = minDistance;
            }
        }

        if (nearLabelIndex === -1 || nearDistance > 50) {
            nearestLbael.left = relativeX;
            nearestLbael.right = areaWidth - relativeX - 20;
            nearestLbael.top = relativeY;
            nearestLbael.bottom = areaHeight - relativeY - 20;
            nearestLbael.labelIndex = 0;
            nearestLbael.name = "box"
            let newbox = { ...nearestLbael };
            dispatch(addLabelBox(newbox))
            nearLabelIndex = LabelList.length
            nearPointIndex = 2
        }
        else {
            nearestLbael = { ...LabelList[nearLabelIndex] };
        }

        // 启用全局鼠标移动和释放事件监听
        window.addEventListener('mousemove', handleMouseMoveGlobal);
        window.addEventListener('mouseup', handleMouseUp);

    };

    const handleMouseUp = () => {
        // 解除全局鼠标移动和释放事件监听
        window.removeEventListener('mousemove', handleMouseMoveGlobal);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMoveGlobal = (event: MouseEvent) => {
        const { height: areaHeight, width: areaWidth } = getAreaHW();
        nearestLbael = { ...nearestLbael };
        if (nearLabelIndex === -1)
            return;
        const { x: relativeX, y: relativeY } = relativeXY(event);

        switch (nearPointIndex) {
            case 0:
                nearestLbael.left = Math.max(0, relativeX)
                nearestLbael.top = Math.max(0, relativeY)
                break;
            case 1:
                nearestLbael.right = Math.max(0, areaWidth - relativeX)
                nearestLbael.top = Math.max(0, relativeY)

                break;
            case 2:
                nearestLbael.right = Math.max(0, areaWidth - relativeX)
                nearestLbael.bottom = Math.max(0, areaHeight - relativeY)
                break;
            case 3:
                nearestLbael.left = Math.max(0, relativeX)
                nearestLbael.bottom = Math.max(0, areaHeight - relativeY)
                break;
        }
        dispatch(updateLabelBox({ index: nearLabelIndex, labelBox: nearestLbael }))

    };
    // 组件卸载时确保移除所有监听器
    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    let boxsDiv: JSX.Element[] = [];
    // boxsDiv = []
    for (let i = 0; i < LabelList.length; i++) {
        boxsDiv.push(
            <div
                key={i}
                style={{
                    position: 'absolute',
                    top: `${LabelList[i].top}px`,
                    bottom: `${LabelList[i].bottom}px`,
                    left: `${LabelList[i].left}px`,
                    right: `${LabelList[i].right}px`,
                    border: '5px solid ' + LabelState[LabelList[i].labelIndex].color.toString(),
                }}

            >
            </div>
        )
    }
    return (
        <div className="LabelingArea" ref={labelingAreaRef} onMouseDown={handleMouseDown}>
            <img className='LbaelingImage' src={CurrentImage.imagePath} alt={CurrentImage.fileName} height="100%" width="100%" />
            {boxsDiv}
        </div>
    );
};

export default LabelingArea;