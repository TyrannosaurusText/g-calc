
import { NumberField } from "./utils/NumberField.js";
import { buffsList } from "./utils/Effects.js";
import { updateSheetAndStatsType, toggleSheetAndStatsValue, updateSheetAndStatsValue, updateSheetArray, arrayUpdater } from './utils/updaters.js'
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { SelectionValueField, } from "./utils/SelectionValueField.js";
import { Checkbox } from "./utils/Checkbox.js";

const BuffName = "BuffName";
const BuffType = "BuffType";
const BuffValue = "BuffValue"
const BuffToggle = "BuffToggle";


const BuffInputField = ({ id, index, remove }) => {
    const dispatch = useDispatch();
    const updateName = updateSheetArray(dispatch);
    const updateType = updateSheetAndStatsType(dispatch);
    const updateValue = updateSheetAndStatsValue(dispatch);
    const updateToggle = toggleSheetAndStatsValue(dispatch);
    const BuffTypeValue = [BuffType, BuffValue];
    const props = { ...useSelector(selectSheet), ...useSelector(selectStats) }
    const onNameChange = arrayUpdater(BuffTypeValue, updateName, props);
    const onTypeChange = arrayUpdater(BuffTypeValue, updateType, props);
    const onValueChange = arrayUpdater(BuffTypeValue, updateValue, props);
    const onToggleChange = arrayUpdater(BuffTypeValue, updateToggle, props);
    return (
        <tr key={id}>
            <td className="damageField__td" >
                <input
                    type={"text"}
                    defaultValue={props[BuffName][index]}
                    onBlur={(e) => onNameChange(BuffName, index)(e.target.value)}
                ></input>
            </td>
            <td className="damageField__td" >
                <SelectionValueField
                    array={buffsList}
                    onChange={onTypeChange(BuffType, index)}
                    defaultValue={props[BuffType][index]}
                />
            </td>
            <td className="damageField__td" >
                <NumberField
                    onChange={onValueChange(BuffValue, index)}
                    defaultValue={props[BuffValue][index]}
                />
            </td>

            <td className="damageField__td" >
                <Checkbox
                    onChange={onToggleChange(BuffToggle, index)}
                    defaultValue={props[BuffToggle][index]}
                />
            </td>

            <td className="damageField__td" >
                {remove(index)}
            </td>
        </tr>
    );
};
export default BuffInputField;