import { updateSheet } from "../../features/sheet/sheetSlice.js";

const updateValueFactory = (dispatch) => (typeName, typeValue, sheetKey, index = 0) => (value) => {
    // if (typeof typeValue === 'object' && typeValue !== null) {
    //     const newState = typeValue;
    //     console.log(newState)
    //     newState[index] = value;
    //     dispatch(updateSheet({ [sheetKey]: newState }))
    // }
    // else {
    dispatch(updateSheet({ [sheetKey]: value }))
    // }
}
const updateTypeFactory = (dispatch) => (typeName, typeValue, sheetKey, index = 0) => (value) => {
    // if (typeof typeValue === 'object') {
    //     const newState = typeName;
    //     newState[index] = value;
    //     dispatch(updateSheet({ [sheetKey]: newState }))
    // }
    // else {
    dispatch(updateSheet({ [sheetKey]: value }))
    // }
}
const arrayUpdater = (Names, updater, props) => (key, index) => (value) => {
    console.log(Names, props, key, value)
    console.log(index)
    var passives = [...props[key]];
    passives[index] = value;
    updater(...Names, key, index)(passives)
}
const sheetUpdater = (Names, updater) => key => value => {
    console.log(Names, key, value)
    updater(...Names, key)(value)
}
export { updateValueFactory, updateTypeFactory, arrayUpdater, sheetUpdater }