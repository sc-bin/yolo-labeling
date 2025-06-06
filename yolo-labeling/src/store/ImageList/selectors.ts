import {type RootState} from "../index";
import { createSelector } from "@reduxjs/toolkit";


export const getCurrentIndex = createSelector(
    (state: RootState) => state.image.currentIndex,
    (currentIndex) => currentIndex
);
export const getCurrentImage = createSelector(
    (state: RootState) => state.image.currentImageFile,
    (currentImage) => currentImage
);
export const getImageList = createSelector(
    (state: RootState) => state.image.Imagelist,
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
export const getCurrentWorkLabel = createSelector(
    (state: RootState) => state.image.currentImageFile.workLabel,
    (labelIndex) => labelIndex
);