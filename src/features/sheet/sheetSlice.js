import { createSlice } from '@reduxjs/toolkit';
import initialFields from "../../../src/js/utils/initialValues.js";
import { loadPage } from '../../../src/js/utils/LoadPage.js';
const initialState = {
    ...initialFields,
    currentSheet: 'null',
    view: '',
}
export const sheetSlice = createSlice({
    name: 'sheet',
    initialState: { ...initialState, ...loadPage('CharacterSheet1') },
    reducers: {
        updateSheet: (state, action) => {
            for (var key in action.payload)
                state[key] = action.payload[key];
        },
        loadSheet: (state, action) => {
            const newState = { ...initialState, ...action.payload }
            for (var key in newState)
                state[key] = newState[key];
        }
    },
});

export const { updateSheet, loadSheet } = sheetSlice.actions;
export const selectSheet = state => state.sheet;
export default sheetSlice.reducer;
