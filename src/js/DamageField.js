import React from "react";
import {
  SelectionValueField,
} from "./utils/SelectionValueField.js";
import { NumberField } from "./utils/NumberField.js";
import { MultiField } from "./utils/MultiField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateStatTypeFactory, updateStatValueFactory, arrayUpdater, sheetUpdater, updateSheetValue } from './utils/updaters.js'

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const SetValueStr = "DamageValue";
const DamageField = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const updateSheet = updateSheetValue(dispatch);
  const updateType = updateStatTypeFactory(dispatch);
  const updateValue = updateStatValueFactory(dispatch);
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
      "Ele Skill",
      "Ele Burst",
    ]
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
          defaultValue={DamageTypes[0]}
        />
      </div>
    );
  };
  const monsterLevelStr = "monsterLevelStr";
  const monsterResStr = "monsterLevelStr";
  // const monsterDamageReduction =
  //   (props[monsterResStr] * (100 + props[monsterLevelStr])) /
  //   (100 + props[characterLevel]);

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
