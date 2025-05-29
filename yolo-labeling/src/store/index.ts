import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./ImageList/actions";
import labelReducer from "./LabelState/actions";
import viewReducer from "./EditorViews/actions";


export const store = configureStore({
    reducer: {
        image: imageReducer,
        label: labelReducer,
        views: viewReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
