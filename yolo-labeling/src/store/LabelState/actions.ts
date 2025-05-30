import { createSlice } from "@reduxjs/toolkit";

export interface LabelClass {
    name: string;
    color: string;
}
interface StateInterface {
    labelstate: LabelClass[];
}
const initialState: StateInterface = {
    labelstate: [
    ]
}
export const LabelList = createSlice({
    name: "LabelList",
    initialState,
    reducers: {
        addLabelClass(state, action: { payload: LabelClass }) {
            state.labelstate.push(action.payload);
        },
        deleteLabelClass(state, action: { payload: number }) {
            state.labelstate.splice(action.payload, 1);
        },
        updateLabelColor(state, action: { payload: { index: number, color: string } }) {
            state.labelstate[action.payload.index].color = action.payload.color;
        },
        updateLabelName(state, action: { payload: { index: number, name: string } }) {
            state.labelstate[action.payload.index].name = action.payload.name;
        },
    }
});
export default LabelList.reducer;
export const { addLabelClass,deleteLabelClass, updateLabelColor, updateLabelName } = LabelList.actions;