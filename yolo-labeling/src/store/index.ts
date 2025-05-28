import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./ImageList/actions";
import labelReducer from "./LabelState/actions";


export const store = configureStore({
    reducer: {
        image: imageReducer,
        label: labelReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
