import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "@reduxjs/toolkit";
interface Box {
    name: string;
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;
}
interface Label {
    count: number;
    labels: Box[];

}
interface ImageFile {
    imagePath: string;
    fileName: string;
    labels: Label[];
}
interface StateInterface {
    list: ImageFile[];
    currentIndex: number;
    currentImageFile: ImageFile;
    count: number;
}
const initialState: StateInterface = {
    list: [],
    currentIndex: -1,
    currentImageFile: { imagePath: "", fileName: "" },
    count: 0
}

export const imageList = createSlice({
    name: "imageList",
    initialState,
    reducers: {
        addImage(state, action: { payload: ImageFile }) {
            state.list.push(action.payload);
            state.count += 1;
        },
        selectImage(state, action: { payload: number }) {
            state.currentIndex = action.payload;
            state.currentImageFile = state.list[action.payload];
        }

    }
});
export default imageList.reducer;

export const { addImage, selectImage } = imageList.actions;

