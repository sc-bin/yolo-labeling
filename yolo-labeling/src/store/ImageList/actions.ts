import { createSlice } from "@reduxjs/toolkit";
import { type LabelBox, type LabelBoxPropsXYWH, type LabelBoxPropsPoints, type ImageClass } from './type'
interface updateLabelProps {
    index: number;
    labelBox: LabelBoxPropsXYWH | LabelBoxPropsPoints;
}

interface StateInterface {
    list: ImageClass[];
    currentIndex: number;
    currentImageFile: ImageClass;
    count: number;
}
const initialState: StateInterface = {
    list: [],
    currentIndex: -1,
    currentImageFile: { imagePath: "", fileName: "", labels: [] },
    count: 0
}

function xywh2LabelBox(box: LabelBoxPropsXYWH): LabelBox {
    return {
        name: box.name,
        labelIndex: box.label,
        x: box.x,
        y: box.y,
        w: box.w,
        h: box.h,
        points: [
            { x: box.x - box.w / 2, y: box.y - box.h / 2 },
            { x: box.x + box.w / 2, y: box.y - box.h / 2 },
            { x: box.x + box.w / 2, y: box.y + box.h / 2 },
            { x: box.x - box.w / 2, y: box.y + box.h / 2 },
        ]
    }
}
function points2LabelBox(box: LabelBoxPropsPoints): LabelBox {
    return {
        name: box.name,
        labelIndex: box.label,
        w: box.points[1].x - box.points[0].x,
        h: box.points[2].y - box.points[0].y,
        x: (box.points[1].x - box.points[0].x) / 2 + box.points[0].x,
        y: (box.points[2].y - box.points[0].y) / 2 + box.points[0].y,
        points: box.points
    }
}
export const imageList = createSlice({
    name: "imageList",
    initialState,
    reducers: {
        addImage(state, action: { payload: ImageClass }) {
            state.list.push(action.payload);
            if (state.currentIndex === -1) {
                state.currentIndex = 0;
                state.currentImageFile = state.list[0];
            }
            state.count += 1;
        },
        selectImage(state, action: { payload: number }) {
            state.currentIndex = action.payload;
            state.currentImageFile = state.list[action.payload];
        },
        addLabelBox(state, action: { payload: LabelBoxPropsXYWH | LabelBoxPropsPoints }) {
            if ('points' in action.payload) {
                state.list[state.currentIndex].labels.push(points2LabelBox(action.payload));
            } else {
                state.list[state.currentIndex].labels.push(xywh2LabelBox(action.payload));
            }
            state.currentImageFile = state.list[state.currentIndex];
        },
        updateLabelBox(state, action: { payload: updateLabelProps }) {
            if ('points' in action.payload.labelBox)
                state.list[state.currentIndex].labels[action.payload.index] = points2LabelBox(action.payload.labelBox);
            else
                state.list[state.currentIndex].labels[action.payload.index] = xywh2LabelBox(action.payload.labelBox);
            state.currentImageFile = state.list[state.currentIndex];
        },
        deleteLabelBox(state, action: { payload: number }) {
            state.list[state.currentIndex].labels.splice(action.payload, 1);
            state.currentImageFile = state.list[state.currentIndex];
        },

    }
});
export default imageList.reducer;

export const { addImage, selectImage, addLabelBox, updateLabelBox,deleteLabelBox } = imageList.actions;

