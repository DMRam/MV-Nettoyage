import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const modalContactForm = false

const initialState = {
    language: '⚜️ FR',
    modalContactForm
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
        sliceOnChangeLanguage(state, action) {
            state.language = action.payload
        },
    },
});

export const { sliceOnChangeLanguage } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;