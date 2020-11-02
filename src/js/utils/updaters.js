import { updateSheet } from "../../features/sheet/sheetSlice.js";

const updateValueFactory = (dispatch) => (typeName, typeValue, sheetKey, index = 0) => (value) => {
    console.log(typeValue)
    if (typeof typeValue === 'object') {
        const newState = typeValue;
        newState[index] = value;
        dispatch(updateSheet({ [sheetKey]: newState }))
    }
    else {
        dispatch(updateSheet({ [sheetKey]: value }))
    }
}
const updateTypeFactory = (dispatch) => (typeName, typeValue, sheetKey, index = 0) => (value) => {
    if (typeof typeValue === 'object') {
        const newState = typeName;
        newState[index] = value;
        dispatch(updateSheet({ [sheetKey]: newState }))
    }
    else {
        dispatch(updateSheet({ [sheetKey]: value }))
    }
}
export { updateValueFactory, updateTypeFactory }