import {
    WeaponFieldName,
    avaliableFields,
} from "../Names.js";

export const loadPage = (page) => {
    const localStoreData = localStorage.getItem(page);
    try {
        const data = localStoreData ? JSON.parse(localStoreData) : {};
        var state = { currentSheet: page }
        if (data[WeaponFieldName]) {
            avaliableFields.forEach(field => {
                var val = data[field] !== 'undefined' ? JSON.parse(data[field]) : {}
                state = data[field] ? { ...state, ...val } : {};
            })
        }
        else state = { ...data };
        return state;
    }
    catch (e) {
        console.log(e)
    }
};