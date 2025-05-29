import { createSlice } from "@reduxjs/toolkit";
import { type LabelBox, type ImageClass } from './type'
interface updateLabelProps {
    index: number;
    labelBox: LabelBox;
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
    currentImageFile: { imageUrl: "", fileName: "", labels: [], workLabel: -1 },
    count: 0
}

export const imageList = createSlice({
    name: "imageList",
    initialState,
    reducers: {
        // 添加一张新图片
        addImage(state, action: { payload: ImageClass }) {
            state.list.push(action.payload);
            if (state.currentIndex === -1) {
                state.currentIndex = 0;
                state.currentImageFile = state.list[0];
            }
            state.count += 1;
        },
        // 选中一张图片
        selectImage(state, action: { payload: number }) {
            state.currentIndex = action.payload;
            state.currentImageFile = state.list[action.payload];
        },
        // 为当前选中的图片增加一个标签盒子
        addLabelBox(state, action: { payload: LabelBox }) {
            state.list[state.currentIndex].labels.push(action.payload);
            state.currentImageFile = state.list[state.currentIndex];
        },
        // 更新一个标签盒子
        updateLabelBox(state, action: { payload: updateLabelProps }) {
            state.list[state.currentIndex].labels[action.payload.index] = action.payload.labelBox;
            state.currentImageFile = state.list[state.currentIndex];
        },
        // 删除一个标签盒子
        deleteLabelBox(state, action: { payload: number }) {
            state.list[state.currentIndex].labels.splice(action.payload, 1);
            state.currentImageFile = state.list[state.currentIndex];
        },
        // 更新当前图片正在工作的标签
        SelectCurrentWorkLabel(state, action: { payload: number }) {
            state.list[state.currentIndex].workLabel = action.payload;
            state.currentImageFile = state.list[state.currentIndex];
        },
        // 更新当前图片指定标签框属于哪个标签
        updateLabelBoxLabel(state, action: { payload: { labelIndex: number, boxIndex: number } }) {
            state.list[state.currentIndex].labels[action.payload.boxIndex].labelIndex = action.payload.labelIndex;
            state.currentImageFile = state.list[state.currentIndex];
        },


    }
});
export default imageList.reducer;

export const { addImage, selectImage, addLabelBox, updateLabelBox, deleteLabelBox, SelectCurrentWorkLabel, updateLabelBoxLabel } = imageList.actions;

