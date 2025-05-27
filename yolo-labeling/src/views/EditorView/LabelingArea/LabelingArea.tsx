import React, { useState, useEffect, useRef } from 'react';
import './LabelingArea.css'
import { useSelector } from "react-redux";
import { getCurrentImage } from "../../../store";
import Box from './Box/Box'

interface Point {
    x: number;
    y: number;
}

const LabelingArea: React.FC = () => {
    const CurrentImage = useSelector(getCurrentImage);
    const labelingAreaRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [X, setX] = useState(50);
    const [Y, setY] = useState(60);
    const [W, setW] = useState(10);
    const [H, setH] = useState(60);

    let points = [
        { x: X - W / 2, y: Y - H / 2 },
        { x: X + W / 2, y: Y - H / 2 },
        { x: X + W / 2, y: Y + H / 2 },
        { x: X - W / 2, y: Y + H / 2 },
    ];
    function generatePoints(): Point[] {
        return [
            { x: X - W / 2, y: Y - H / 2 },
            { x: X + W / 2, y: Y - H / 2 },
            { x: X + W / 2, y: Y + H / 2 },
            { x: X - W / 2, y: Y + H / 2 },
        ];
    }
    function getXY(event: React.MouseEvent<HTMLDivElement> | MouseEvent) {

        const rect = labelingAreaRef.current?.getBoundingClientRect();
        if (rect) {
            let relativeX = (event.clientX - rect.left) * 100 / rect.width;
            let relativeY = (event.clientY - rect.top) * 100 / rect.height;
            relativeX = Math.min(100, Math.max(0, relativeX));
            relativeY = Math.min(100, Math.max(0, relativeY));
            return {
                x: relativeX,
                y: relativeY,
            };
        }
        else
            return {
                x: 0,
                y: 0,
            };
    };

    // 鼠标按下事件
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // 阻止默认的拖拽行为


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
        let point = getXY(event)

        // 计算point在points里面距离哪个点最近
        let nearestPointIndex = -1;
        let minDistance = Infinity;
        for (let i = 0; i < points.length; i++) {
            const distance = Math.sqrt(
                Math.pow(point.x - points[i].x, 2) +
                Math.pow(point.y - points[i].y, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestPointIndex = i;
            }
        }

        const diffX = point.x - points[nearestPointIndex].x;
        const diffY = point.y - points[nearestPointIndex].y;
        setX(X + diffX / 2);
        setY(Y + diffY / 2);
        switch (nearestPointIndex) {
            case 0:
                setW(Math.max(5, W - diffX));
                setH(Math.max(5, H - diffY));
                break;
            case 1:
                setW(Math.max(5, W + diffX));
                setH(Math.max(5, H - diffY));
                break;
            case 2:
                setW(Math.max(5, W + diffX));
                setH(Math.max(5, H + diffY));
                break;
            case 3:
                setW(Math.max(5, W - diffX));
                setH(Math.max(5, H + diffY));
                break;
        }
        points = generatePoints();
    };
    // 组件卸载时确保移除所有监听器
    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    return (
        <div className="LabelingArea" ref={labelingAreaRef} onMouseDown={handleMouseDown}>
            <img className='LbaelingImage' src={CurrentImage.imagePath} alt={CurrentImage.fileName} width="100%" />
            <div
                ref={boxRef}
                style={{
                    position: 'absolute',
                    top: `${Y}%`,
                    left: `${X}%`,
                    width: `${W}%`,
                    height: `${H}%`,
                    transform: 'translate(-50%, -50%)',
                    border: '5px solid red',
                }}

            >
                {/* <Box /> */}
            </div>
        </div>
    );
};

export default LabelingArea;