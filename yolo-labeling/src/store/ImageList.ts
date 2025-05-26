import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "@reduxjs/toolkit";
interface ImageState {
    imagePath: string;
    fileName: string;
}
interface StateInterface {
    list: ImageState[];
    currentIndex: number;
    currentImage: ImageState;
    count: number;
}
const initialState: StateInterface = {
    list: [],
    currentIndex: -1,
    currentImage: { imagePath: "", fileName: "" },
    count: 0
}

export const imageList = createSlice({
    name: "imageList",
    initialState,
    reducers: {
        addImage(state, action: { payload: ImageState }) {
            state.list.push(action.payload);
            state.count += 1;
        },
        selectImage(state, action: { payload: number }) {
            state.currentIndex = action.payload;
            state.currentImage = state.list[action.payload];
        }

    }
});
export default imageList.reducer;

export const { addImage, selectImage } = imageList.actions;


// export const getCurrentIndex = createSelector(
//     (state: StateInterface) => state.currentIndex,
//     (currentIndex) => currentIndex
// );
// export const getcurrentImage = createSelector(
//     (state: StateInterface) => state.currentImage,
//     (currentImage) => currentImage
// );
// export const getImageList = createSelector(
//     (state: StateInterface) => state.list,
//     (list) => list
// );
// export const getImageCount = createSelector(
//     (state: StateInterface) => state.count,
//     (count) => count
// );