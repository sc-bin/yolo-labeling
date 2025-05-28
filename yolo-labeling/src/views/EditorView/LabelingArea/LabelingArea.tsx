import React, { useEffect, useRef } from 'react';
import './LabelingArea.css'
import { useSelector, useDispatch } from "react-redux";
import { getCurrentImage } from "../../../store/ImageList/selectors";
import { addLabelBox, updateLabelBox } from "../../../store/ImageList/actions";
import { type LabelBoxPropsXYWH, type LabelBox } from "../../../store/ImageList/type";
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
    let nearestLbael: LabelBox | null = null;
    const relativeXY = (event: React.MouseEvent<HTMLDivElement> | MouseEvent): { x: number, y: number } => {

        const rect = labelingAreaRef.current?.getBoundingClientRect();
        if (rect != null) {
            let relativeX = event.clientX - rect.left;
            let relativeY = event.clientY - rect.top;
            relativeX = Math.min(rect.width, Math.max(0, relativeX));
            relativeY = Math.min(rect.height, Math.max(0, relativeY));
            return { x: relativeX, y: relativeY };
        }
        else
            return { x: 0, y: 0 };
    }
    // 鼠标按下事件
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // 阻止默认的拖拽行为
        const { x: relativeX, y: relativeY } = relativeXY(event);

        nearLabelIndex = -1;
        nearPointIndex = -1;
        nearDistance = -1;
        for (let i = 0; i < LabelList.length; i++) {

            let npoint = -1;
            let minDistance = Infinity;
            for (let j = 0; j < 4; j++) {
                const px = LabelList[i].points[j].x
                const py = LabelList[i].points[j].y
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

            const box: LabelBoxPropsXYWH =
            {
                name: "box",
                label: 0,
                x: relativeX,
                y: relativeY,
                w: 1,
                h: 1,
            }
            nearestLbael = {
                name: "box",
                labelIndex: 0,
                x: relativeX,
                y: relativeY,
                w: 1,
                h: 1,
                points: [
                    { x: relativeX, y: relativeY },
                    { x: relativeX + 1, y: relativeY },
                    { x: relativeX + 1, y: relativeY + 1 },
                    { x: relativeX, y: relativeY + 1 },
                ],
            }
            dispatch(addLabelBox(box))
            nearLabelIndex = LabelList.length
            nearPointIndex = 2
        }
        else
            nearestLbael = LabelList[nearLabelIndex]

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
        if (nearLabelIndex === -1)
            return;
        const { x: relativeX, y: relativeY } = relativeXY(event);
        if (nearestLbael != null) {
            let newlabel: LabelBoxPropsXYWH =
            {
                name: nearestLbael.name,
                label: nearestLbael.labelIndex,
                x: nearestLbael.x,
                y: nearestLbael.y,
                w: nearestLbael.w,
                h: nearestLbael.h,
            }
            const diffX = relativeX - nearestLbael.points[nearPointIndex].x;
            const diffY = relativeY - nearestLbael.points[nearPointIndex].y;

            newlabel.x = newlabel.x + diffX / 2;
            newlabel.y = newlabel.y + diffY / 2;
            switch (nearPointIndex) {
                case 0:
                    newlabel.w = Math.max(5, newlabel.w - diffX)
                    newlabel.h = Math.max(5, newlabel.h - diffY)
                    break;
                case 1:
                    newlabel.w = Math.max(5, newlabel.w + diffX)
                    newlabel.h = Math.max(5, newlabel.h - diffY)
                    break;
                case 2:
                    newlabel.w = Math.max(5, newlabel.w + diffX)
                    newlabel.h = Math.max(5, newlabel.h + diffY)
                    break;
                case 3:
                    newlabel.w = Math.max(5, newlabel.w - diffX)
                    newlabel.h = Math.max(5, newlabel.h + diffY)
                    break;
            }
            dispatch(updateLabelBox({ index: nearLabelIndex, labelBox: newlabel }))
        }

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
                    top: `${LabelList[i].y}px`,
                    left: `${LabelList[i].x}px`,
                    width: `${LabelList[i].w}px`,
                    height: `${LabelList[i].h}px`,

                    transform: 'translate(-50%, -50%)',
                    border: '5px solid ' + LabelState[LabelList[i].labelIndex].color.toString(),
                }}

            >
            </div>
        )
    }
    return (
        <div className="LabelingArea" ref={labelingAreaRef} onMouseDown={handleMouseDown}>
            <img className='LbaelingImage' src={CurrentImage.imagePath} alt={CurrentImage.fileName} width="100%" />
            {boxsDiv}
        </div>
    );
};

export default LabelingArea;