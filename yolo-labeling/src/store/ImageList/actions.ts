import { createSlice } from "@reduxjs/toolkit";
import { type LabelBox, type ImageClass } from './type'
import exporter from './export'
interface updateLabelProps {
    index: number;
    labelBox: LabelBox;
}

interface StateInterface {
    Imagelist: ImageClass[];
    currentIndex: number;
    currentImageFile: ImageClass;
    count: number;
}
const initialState: StateInterface = {
    Imagelist: [],
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
            state.Imagelist.push(action.payload);
            if (state.currentIndex === -1) {
                state.currentIndex = 0;
                state.currentImageFile = state.Imagelist[0];
            }
            state.count += 1;
        },
        // 选中一张图片
        selectImage(state, action: { payload: number }) {
            state.currentIndex = action.payload;
            state.currentImageFile = state.Imagelist[action.payload];
        },
        // 为当前选中的图片增加一个标签盒子
        addLabelBox(state, action: { payload: LabelBox }) {
            state.Imagelist[state.currentIndex].labels.push(action.payload);
            state.currentImageFile = state.Imagelist[state.currentIndex];
        },
        // 更新一个标签盒子
        updateLabelBox(state, action: { payload: updateLabelProps }) {
            state.Imagelist[state.currentIndex].labels[action.payload.index] = action.payload.labelBox;
            state.currentImageFile = state.Imagelist[state.currentIndex];
        },
        // 删除一个标签盒子
        deleteLabelBox(state, action: { payload: number }) {
            state.Imagelist[state.currentIndex].labels.splice(action.payload, 1);
            state.currentImageFile = state.Imagelist[state.currentIndex];
        },
        // 更新当前图片正在工作的标签
        SelectCurrentWorkLabel(state, action: { payload: number }) {
            state.Imagelist[state.currentIndex].workLabel = action.payload;
            state.currentImageFile = state.Imagelist[state.currentIndex];
        },
        // 更新当前图片指定标签框属于哪个标签
        updateLabelBoxLabel(state, action: { payload: { labelIndex: number, boxIndex: number } }) {
            state.Imagelist[state.currentIndex].labels[action.payload.boxIndex].labelIndex = action.payload.labelIndex;
            state.currentImageFile = state.Imagelist[state.currentIndex];
        },
        // 导出标签
        exportLabels(state, action: {}) {
            for(let i = 0; i < state.Imagelist.length; i++)
            {

                exporter(state.Imagelist[i])
            }

        },


    }
});
export default imageList.reducer;

export const { addImage, selectImage, addLabelBox, updateLabelBox, deleteLabelBox, SelectCurrentWorkLabel, updateLabelBoxLabel, exportLabels } = imageList.actions;

