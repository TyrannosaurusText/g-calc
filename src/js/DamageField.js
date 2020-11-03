import React from "react";
import {
  SelectionValueField,
} from "./utils/SelectionValueField.js";
import { effects } from "./utils/Effects.js";
import { NumberField } from "./utils/NumberField.js";
import { MultiField } from "./utils/MultiField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateSheetArray, arrayUpdater, sheetUpdater, updateSheetValue } from './utils/updaters.js'
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import {
  Overload,
  Electrocharge,
  Superconduct,
  Swirl,
} from "./utils/ReactionLevelDMG.js";
import { Trunc } from "./utils/Trunc.js";

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const SetValueStr = "DamageValue";
const DamageField = () => {
  const props = { ...useSelector(selectSheet), ...useSelector(selectStats) }
  const dispatch = useDispatch();
  const updateSheet = updateSheetValue(dispatch);
  const updateType = updateSheetArray(dispatch);
  const updateValue = updateSheetArray(dispatch);
  const SetTypeValue = [SetTypeStr, SetValueStr];
  const SetTypeLength = props[SetTypeStr] ? props[SetTypeStr].length : 0

  const PassiveInput = ({ id, index }) => {
    const onPassiveValueChange = arrayUpdater(SetTypeValue, updateValue, props);
    const onPassiveTypeChange = arrayUpdater(SetTypeValue, updateType, props);
    const DamageTypes = [
      "None",
      "Phys. Normal",
      "Phys. Charge",
      "Ele. Normal",
      "Ele. Charge",
      "Ele. Skill",
      "Ele. Burst",
    ]
    const calcDamage = (DamageType, DamagePercent = 0) => {
      if (DamageType === "None" || DamagePercent === 0) return <div></div>
      const { totalATK, totalCritDMG, EQA, LVL } = props;
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
      const monsterDefense = (100 + props.LVL) / ((100 + props[monsterLevelStr] - (props.defReduction || 0)) + (100 + props.LVL));
      console.log(monsterDefense)
      console.log(totalATK, DamagePercent / 100, AtkType[DamageType] / 100)
      const Damage = Trunc(totalATK * (DamagePercent / 100) * (AtkType[DamageType] / 100) * (1 - props[monsterResStr] / 100) * (monsterDefense))
      const Crit = Trunc(Damage * (1 + totalCritDMG / 100))
      return <span> Normal: {Damage} Crit: {Crit} </span>
    }
    return (
      <div key={id}>
        Skill Name:
        <input
          type={"text"}
          defaultValue={props[TalentName][index]}
          onBlur={(e) => onPassiveValueChange(TalentName, index)(e.target.value)}
        ></input>
        Skill Type:
        <SelectionValueField
          array={DamageTypes}
          onChange={onPassiveTypeChange(SetTypeStr, index)}
          component={
            <>
              Skill Damage (%):
              <NumberField
                onChange={onPassiveValueChange(SetValueStr, index)}
                defaultValue={props[SetValueStr][index]}
              />
            </>
          }
          defaultValue={props[SetTypeStr][index]}
        />
        {calcDamage(props[SetTypeStr][index], props[SetValueStr][index])}
      </div>
    );
  };
  const monsterLevelStr = "monsterLevelStr";
  const monsterResStr = "monsterResStr";
  const changeDamageType = sheetUpdater(SetTypeValue, updateValue, props);
  const changeDamageValue = sheetUpdater(SetTypeValue, updateType, props);
  const add = () => {
    const talentNameUpdater = changeDamageValue(TalentName)
    const typeUpdater = changeDamageType(SetTypeStr)
    const valueUpdater = changeDamageValue(SetValueStr)
    talentNameUpdater(props[TalentName].concat(undefined))
    typeUpdater(props[SetTypeStr].concat("None"))
    valueUpdater(props[SetValueStr].concat(undefined))
  };
  const remove = (index) => {
    const talentNameUpdater = changeDamageValue(TalentName)
    const typeUpdater = changeDamageType(SetTypeStr)
    const valueUpdater = changeDamageValue(SetValueStr)
    var talentNameArray = [...props[TalentName]]
    var SetTypeArray = [...props[SetTypeStr]]
    var SetValueArray = [...props[SetValueStr]]
    talentNameArray.splice(index, 1)
    SetTypeArray.splice(index, 1)
    SetValueArray.splice(index, 1)
    talentNameUpdater(talentNameArray)
    typeUpdater(SetTypeArray)
    valueUpdater(SetValueArray)
  };
  return (
    <div>
      Monster Level:
      <NumberField
        onChange={updateSheet(monsterLevelStr)}
        defaultValue={props[monsterLevelStr]}
      />
        Monster Res:
      <NumberField
        onChange={updateSheet(monsterResStr)}
        defaultValue={props[monsterResStr]}
      />
      {/* Total Damage Reduction: {monsterDamageReduction} */}
      <MultiField
        initialLength={SetTypeLength}
        component={PassiveInput}
        addEffect={add}
        removeEffect={remove}
      />
    </div>
  );
}

export default DamageField;
