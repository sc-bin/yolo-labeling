import { createSlice } from "@reduxjs/toolkit";

export const ViewsEnum = {
    EditorView: "@@EditorView",
    UploadWindow: "@@UploadWindow",
    LabelWindow: "@@LabelWindow",

}
interface StateInterface {
    currentView: string;
}
const initialState: StateInterface = {
    currentView: ViewsEnum.UploadWindow,
}

export const Views = createSlice({
    name: "LabelList",
    initialState,
    reducers: {
        selectView: (state, action) => {
            state.currentView = action.payload;
        }
    }
});
export default Views.reducer;
export const { selectView } = Views.actions;