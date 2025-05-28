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
            color: "rgb(77, 241, 153)"
        },
        {
            name: "苹果",
            color: "rgb(22, 15, 162)"
        },
        {
            name: "桃子",
            color: "rgb(135, 133, 39)"
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
    }
});
export default LabelList.reducer;
export const { addLabelClass } = LabelList.actions;