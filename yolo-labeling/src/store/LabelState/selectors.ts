import {type RootState} from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const getLabelStates= createSelector(
    (state: RootState) => state.label.labelstate ,
    (labelstate) => labelstate
);