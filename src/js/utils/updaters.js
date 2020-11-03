import { updateSheet } from "../../features/sheet/sheetSlice.js";
import { calcDelta } from "../../features/totalStats/totalStatsSlice.js";

const updateStatValueFactory = (dispatch) => (oldType, oldValue, sheetKey, index = 0) => (value) => {
    var delta = { oldType: oldType, oldValue: oldValue };
    if (Array.isArray(value)) {
        delta.newType = oldType;
        delta.newValue = value[index];
    }
    else {
        delta.newType = oldType;
        delta.newValue = value;
    }
    dispatch(calcDelta(delta))
    updateSheetValue(dispatch)(sheetKey)(value)
}
const updateStatTypeFactory = (dispatch) => (oldType, oldValue, sheetKey, index = 0) => (value) => {
    var delta = { oldType: oldType, oldValue: oldValue };
    if (Array.isArray(value)) {
        delta.newType = value[index];
        delta.newValue = oldValue;
    }
    else {
        delta.newType = value;
        delta.newValue = oldValue;
    }
    dispatch(calcDelta(delta))
    updateSheetValue(dispatch)(sheetKey)(value)
}
const updateSheetValue = (dispatch) => (key) => (value) => {
    dispatch(updateSheet({ [key]: value }))
}
const arrayUpdater = (Names, updater, props) => (key, index) => (value) => {
    var passives = [...props[key]];
    passives[index] = value;
    updater(...Names.map((name) => props[name][index]), key, index)(passives)
}
const sheetUpdater = (Names, updater, props) => key => value => {
    updater(...Names.map((name) => props[name]), key)(value)
}
export { updateStatValueFactory, updateStatTypeFactory, arrayUpdater, sheetUpdater, updateSheetValue }