import {
    Overload,
    Electrocharge,
    Superconduct,
    Swirl,
    EMCalc,
    Shattered,
} from "./utils/ReactionLevelDMG.js";
import { NumberField } from "./utils/NumberField.js";
import { Trunc } from "./utils/Trunc.js";
import { effects } from "./utils/Effects.js";
import { DamageTypes, ReactionTypes } from "./Names.js";
import { updateSheetArray, arrayUpdater } from './utils/updaters.js'
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { SelectionValueField, } from "./utils/SelectionValueField.js";

const TalentName = "TalentName";
const DamageTypeStr = "DamageType";
const ReactionMultipliers = "ReactionMultipliers"
const TalentMultiplierStr = "DamageValue";
const monsterLevelStr = "monsterLevelStr";
const monsterResStr = "monsterResStr";
const resReduction = "resReduction";
const defReduction = "defReduction";

const calcRes = (res, red) => res > red ? res - red : -(red - res) / 2;
const calcDef = (plvl, mlvl, dr) => (100 + plvl) / (((100 + mlvl) * (1 - dr / 100 || 0)) + (100 + plvl));
const calcDamage = (props, index) => {
    const DamageType = props[DamageTypeStr][index];
    const DamagePercent = props[TalentMultiplierStr][index];
    if (DamageType === "None" || DamagePercent === 0) return [null, null]
    const EQB = EMCalc.EQB(props.totalEM);
    const { totalATK, totalCritDMG } = props;
    const ReactionMultObj = {
        "None": 1,
        "Pyro Vaporize/Cryo Melt": Trunc(1.5 * (1 + EQB / 100)),
        "Hydro Vaporize/Pyro Melt": Trunc(2 * (1 + EQB / 100)),
    }
    const ReactionMultiplier = ReactionMultObj[props[ReactionMultipliers || "None"][index]]
    const sumEffects = (...effects) => {
        var sum = 0;
        for (var i in effects) {
            sum += getVal(effects[i]);
        }
        return sum;
    };
    const getVal = (stat) => {
        var val = props[stat] || 0;
        return val;
    };
    const atkType = {
        "Phys. Normal": 100 + sumEffects(effects.Normal, effects.Total, effects.phys),
        "Phys. Charge": 100 + sumEffects(effects.Charge, effects.Total, effects.phys),
        "Ele. Normal": 100 + sumEffects(effects.Normal, effects.Total, effects.ele),
        "Ele. Charge": 100 + sumEffects(effects.Charge, effects.Total, effects.ele),
        "Ele. Skill": 100 + sumEffects(effects.Skill, effects.Total, effects.ele),
        "Ele. Burst": 100 + sumEffects(effects.Burst, effects.Total, effects.ele),
    };
    const monsterDefense = calcDef(props.LVL, Math.max(1, props[monsterLevelStr]), props[defReduction])
    const monsterResistance = 1 - calcRes(props[monsterResStr], props[resReduction]) / 100;
    const Damage = Math.floor(totalATK * (DamagePercent / 100) * (atkType[DamageType] / 100) * monsterResistance * monsterDefense * ReactionMultiplier)
    const Crit = Math.floor(Damage * (1 + totalCritDMG / 100))
    return [Damage, Crit]
}
const calcReaction = (props, index) => {
    const EQA = EMCalc.EQA(props.totalEM);
    const charLevel = props.LVL;
    const atkType = {
        "Swirl": Trunc(Swirl(charLevel) * (1 + EQA / 100 + (props[effects.Swirl] || 0) / 100)),
        "Shattered": Trunc(Shattered(charLevel) * (1 + EQA / 100 + (props[effects.Shattered] || 0) / 100)),
        "Overload": Trunc(Overload(charLevel) * (1 + EQA / 100 + (props[effects.Overload] || 0) / 100)),
        "Electrocharge": Trunc(Electrocharge(charLevel) * (1 + EQA / 100 + (props[effects.Eletrocharge] || 0) / 100)),
        "Superconduct": Trunc(Superconduct(charLevel) * (1 + EQA / 100 + (props[effects.Superconduct] || 0) / 100)),
    }
    const reaction = props[DamageTypeStr][index];
    const monsterResistance = 1 - calcRes(props[monsterResStr], props[resReduction]) / 100;
    return Math.floor(atkType[reaction] * monsterResistance)
}
const DamageCalcField = ({ id, index, remove }) => {
    const dispatch = useDispatch();
    const updateType = updateSheetArray(dispatch);
    const updateValue = updateSheetArray(dispatch);
    const SetTypeValue = [DamageTypeStr, TalentMultiplierStr];
    const props = { ...useSelector(selectSheet), ...useSelector(selectStats) }
    const onPassiveValueChange = arrayUpdater(SetTypeValue, updateValue, props);
    const onPassiveTypeChange = arrayUpdater(SetTypeValue, updateType, props);
    var Normal, Critical = undefined;
    if (DamageTypes.includes(props[DamageTypeStr][index]))
        [Normal, Critical] = calcDamage(props, index)
    else if (ReactionTypes.includes(props[DamageTypeStr][index]))
        Normal = calcReaction(props, index);
    return (
        <tr key={id}>
            <td className="table__td" >
                {DamageTypes.includes(props[DamageTypeStr][index]) ?
                    <input
                        type={"text"}
                        defaultValue={props[TalentName][index]}
                        onBlur={(e) => onPassiveValueChange(TalentName, index)(e.target.value)}
                    ></input>
                    : <></>}
            </td>
            <td className="table__td" >
                <SelectionValueField
                    array={DamageTypes.concat(ReactionTypes)}
                    onChange={onPassiveTypeChange(DamageTypeStr, index)}
                    defaultValue={props[DamageTypeStr][index]}
                />
            </td>
            <td className="table__td" >
                {DamageTypes.includes(props[DamageTypeStr][index]) ?
                    <NumberField
                        onChange={onPassiveValueChange(TalentMultiplierStr, index)}
                        defaultValue={props[TalentMultiplierStr][index]}
                    /> : <></>}
            </td>
            <td className="table__td" >
                {DamageTypes.includes(props[DamageTypeStr][index]) ?

                    <SelectionValueField
                        array={["None", "Pyro Vaporize/Cryo Melt", "Hydro Vaporize/Pyro Melt"]}
                        onChange={onPassiveTypeChange(ReactionMultipliers, index)}
                        defaultValue={props[ReactionMultipliers][index]}
                    /> : <></>}

            </td>
            <td className="table__td" >
                {Normal ? Normal.toLocaleString() : ''}
            </td>
            <td className="table__td" >
                {Critical ? Critical.toLocaleString() : ''}
            </td>
            <td className="table__td" >
                {remove(index)}
            </td>
        </tr>
    );
};
export { DamageCalcField, calcDamage, calcRes, calcDef }