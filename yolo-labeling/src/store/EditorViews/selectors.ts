import {type RootState} from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const getViewCurrent= createSelector(
    (state: RootState) => state.views.currentView ,
    (currentView) => currentView
);