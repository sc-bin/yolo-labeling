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
        {
            name: "香蕉",
            color: "rgba(98, 106, 255, 0.8)"
        },
        {
            name: "苹果",
            color: "rgba(15, 14, 14, 0.8)"
        },
        {
            name: "桃子",
            color: "rgba(141, 255, 175, 0.8)"
        },
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