import { updateSheet } from "../../features/sheet/sheetSlice.js";
import { calcDelta } from "../../features/totalStats/totalStatsSlice.js";

const updateSheetAndStatsValue = (dispatch) => (oldType, oldValue, sheetKey, index = 0) => (value) => {
    var delta = { oldType: oldType, oldValue: oldValue };
    if (Array.isArray(value)) {
        delta.newType = oldType;
        delta.newValue = value[index];
    }
    else {
        delta.newType = oldType;
        delta.newValue = value;
    }
    if (!Array.isArray(oldType)) dispatch(calcDelta(delta))
    updateSheetValue(dispatch)(sheetKey)(value)
}
const updateSheetAndStatsType = (dispatch) => (oldType, oldValue, sheetKey, index = 0) => (value) => {
    var delta = { oldType: oldType, oldValue: oldValue };
    if (Array.isArray(value)) {
        delta.newType = value[index];
        delta.newValue = oldValue;
    }
    else {
        delta.newType = value;
        delta.newValue = oldValue;
    }
    if (!Array.isArray(oldType)) dispatch(calcDelta(delta))
    updateSheetValue(dispatch)(sheetKey)(value)
}
const updateSheetValue = (dispatch) => (key) => (value) => {
    dispatch(updateSheet({ [key]: value }))
}
const updateSheetArray = (dispatch) => (oldType, oldValue, sheetKey, index = 0) => (value) => {
    dispatch(updateSheet({ [sheetKey]: value }))
}
const arrayUpdater = (Names, updater, props) => (key, index) => (value) => {
    var passives = [...props[key]];
    passives[index] = value;
    updater(...Names.map((name) => props[name][index]), key, index)(passives)
}
const sheetUpdater = (Names, updater, props) => key => value => {
    updater(...Names.map((name) => props[name]), key)(value)
}

export { updateSheetAndStatsValue, updateSheetAndStatsType, arrayUpdater, sheetUpdater, updateSheetValue, updateSheetArray }