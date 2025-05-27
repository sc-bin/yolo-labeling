import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./ImageList";
import { createSelector } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    image: imageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;


export const getCurrentIndex = createSelector(
    (state: RootState) => state.image.currentIndex,
    (currentIndex) => currentIndex
);
export const getCurrentImage = createSelector(
    (state: RootState) => state.image.currentImageFile,
    (currentImage) => currentImage
);
export const getImageList = createSelector(
    (state: RootState) => state.image.list,
    (list) => list
);
export const getImageCount = createSelector(
    (state: RootState) => state.image.count,
    (count) => count
);
export const getLabelList = createSelector(
    (state: RootState) => state.image.currentImageFile.labels,
    (labels) => labels
);