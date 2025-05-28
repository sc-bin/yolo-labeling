import { createSlice } from "@reduxjs/toolkit";
import { type LabelBox, type ImageClass, type areaSize } from './type'
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
    currentImageFile: { imagePath: "", fileName: "", labels: [], area: { width: 0, height: 0 } },
    count: 0
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
        addLabelBox(state, action: { payload: LabelBox }) {
            state.list[state.currentIndex].labels.push(action.payload);
            state.currentImageFile = state.list[state.currentIndex];
        },
        updateLabelBox(state, action: { payload: updateLabelProps }) {
            state.list[state.currentIndex].labels[action.payload.index] = action.payload.labelBox;
            state.currentImageFile = state.list[state.currentIndex];
        },
        deleteLabelBox(state, action: { payload: number }) {
            state.list[state.currentIndex].labels.splice(action.payload, 1);
            state.currentImageFile = state.list[state.currentIndex];
        },
        updateAreaSize(state, action: { payload: areaSize }) {
            state.list[state.currentIndex].area = action.payload;
        }

    }
});
export default imageList.reducer;

export const { addImage, selectImage, addLabelBox, updateLabelBox, deleteLabelBox, updateAreaSize } = imageList.actions;

