import {type RootState} from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const getLabelList = createSelector(
    (state: RootState) => state.image.currentImageFile.labels,
    (labels) => labels
);
export const getLabelStates= createSelector(
    (state: RootState) => state.label.labelstate ,
    (labelstate) => labelstate
);