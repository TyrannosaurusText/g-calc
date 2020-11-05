import {
    Overload,
    Electrocharge,
    Superconduct,
    Swirl,
} from "./utils/ReactionLevelDMG.js";
import { NumberField } from "./utils/NumberField.js";
import { Trunc } from "./utils/Trunc.js";
import { effects } from "./utils/Effects.js";
import { DamageTypes } from "./Names.js";
import { updateSheetArray, arrayUpdater } from './utils/updaters.js'
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { SelectionValueField, } from "./utils/SelectionValueField.js";

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const ReactionMultipliers = "ReactionMultipliers"
const SetValueStr = "DamageValue";
const monsterLevelStr = "monsterLevelStr";
const monsterResStr = "monsterResStr";
const resReduction = "resReduction";
const defReduction = "defReduction";

const calcRes = (res, red) => res > red ? res - red : -(red - res) / 2;
const calcDef = (plvl, mlvl, dr) => (100 + plvl) / (((100 + mlvl) * (1 - dr / 100 || 0)) + (100 + plvl));
const calcDamage = (props, index) => {
    const DamageType = props[SetTypeStr][index];
    const DamagePercent = props[SetValueStr][index];
    if (DamageType === "None" || DamagePercent === 0) return [null, null]
    const { totalATK, totalCritDMG, EQA, EQB, LVL } = props;
    const ReactionMultObj = {
        "None": 1,
        "Pyro Vaporize/Cryo Melt": Trunc(1.5 * (1 + EQB / 100)),
        "Hydro Vaporize/Pyro Melt": Trunc(2 * (1 + EQB / 100)),
    }

    const ReactionMultiplier = ReactionMultObj[props[ReactionMultipliers || "None"][index]]
    const charLevel = LVL;
    const sumEffects = (...effects) => {
        var sum = 0;
        for (var i in effects) {
            sum += getVal(effects[i]);
        }
        return sum;
    };
    var getVal = (stat) => {
        var val = props[stat] || 0;
        return val;
    };
    var AtkType = {
        "Phys. Normal": 100 + sumEffects(effects.Normal, effects.Total, effects.phys),
        "Phys. Charge": 100 + sumEffects(effects.Charge, effects.Total, effects.phys),
        "Ele. Normal": 100 + sumEffects(effects.Normal, effects.Total, effects.ele),
        "Ele. Charge": 100 + sumEffects(effects.Charge, effects.Total, effects.ele),
        "Ele. Skill": 100 + sumEffects(effects.Skill, effects.Total, effects.ele),
        "Ele. Burst": 100 + sumEffects(effects.Burst, effects.Total, effects.ele),
        "Swirl Dmg": Trunc(Swirl(charLevel) * (1 + EQA / 100)),
        "Overload Dmg": Trunc(Overload(charLevel) * (1 + EQA / 100)),
        "Electrocharge Dmg": Trunc(Electrocharge(charLevel) * (1 + EQA / 100)),
        "Superconduct Dmg": Trunc(Superconduct(charLevel) * (1 + EQA / 100)),
    };
    const monsterDefense = calcDef(props.LVL, props[monsterLevelStr], props[defReduction])
    const monsterResistance = 1 - calcRes(props[monsterResStr], props[resReduction]) / 100;
    const Damage = Math.floor(totalATK * (DamagePercent / 100) * (AtkType[DamageType] / 100) * monsterResistance * monsterDefense * ReactionMultiplier)
    const Crit = Math.floor(Damage * (1 + totalCritDMG / 100))
    return [Damage, Crit]
}
const DamageCalcField = ({ id, index, remove }) => {
    const dispatch = useDispatch();
    const updateType = updateSheetArray(dispatch);
    const updateValue = updateSheetArray(dispatch);
    const SetTypeValue = [SetTypeStr, SetValueStr];
    const props = { ...useSelector(selectSheet), ...useSelector(selectStats) }
    const onPassiveValueChange = arrayUpdater(SetTypeValue, updateValue, props);
    const onPassiveTypeChange = arrayUpdater(SetTypeValue, updateType, props);
    console.log(props.resReduction)
    const [Normal, Critical] = calcDamage(props, index)
    return (
        <tr key={id}>
            <td><input
                type={"text"}
                defaultValue={props[TalentName][index]}
                onBlur={(e) => onPassiveValueChange(TalentName, index)(e.target.value)}
            ></input></td>
            <td>
                <SelectionValueField
                    array={DamageTypes}
                    onChange={onPassiveTypeChange(SetTypeStr, index)}
                    defaultValue={props[SetTypeStr][index]}
                />
            </td>
            <td>
                <NumberField
                    onChange={onPassiveValueChange(SetValueStr, index)}
                    defaultValue={props[SetValueStr][index]}
                />
            </td>
            <td>
                <SelectionValueField
                    array={["None", "Pyro Vaporize/Cryo Melt", "Hydro Vaporize/Pyro Melt"]}
                    onChange={onPassiveTypeChange(ReactionMultipliers, index)}
                    defaultValue={props[ReactionMultipliers][index]}
                />
            </td>
            <td>
                {Normal !== null ? Normal.toLocaleString() : ''}
            </td>
            <td>
                {Critical !== null ? Critical.toLocaleString() : ''}
            </td>
            <td>
                {remove(index)}
            </td>
        </tr>
    );
};
export { DamageCalcField, calcDamage, calcRes, calcDef }