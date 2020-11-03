import { createSlice } from '@reduxjs/toolkit';
import {
    initialDamageField,
    initialCharacterField,
    initialArtifactField,
    initialWeaponField,
} from "../../../src/js/utils/initialValues.js";
import { loadPage } from '../../../src/js/utils/LoadPage.js';
const initialState = {
    ...initialDamageField,
    ...initialCharacterField,
    ...initialArtifactField,
    ...initialWeaponField,
    currentSheet: 'null',
    view: '',
}
export const sheetSlice = createSlice({
    name: 'sheet',
    initialState: loadPage('CharacterSheet1'),
    reducers: {
        updateSheet: (state, action) => {
            for (var key in action.payload)
                state[key] = action.payload[key];
        },
        loadSheet: (state, action) => {
            for (var key in initialState)
                state[key] = action.payload[key];
            for (key in action.payload)
                state[key] = action.payload[key];
        }
    },
});

export const { updateSheet, loadSheet } = sheetSlice.actions;
export const selectSheet = state => state;
export default sheetSlice.reducer;
