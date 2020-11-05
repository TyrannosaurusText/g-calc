import React from "react";

import { NumberField } from "./utils/NumberField.js";
import { MultiField } from "./utils/MultiField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateSheetArray, sheetUpdater, updateSheetValue } from './utils/updaters.js'
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { DamageCalcField, calcDef, calcRes } from "./calcDamage.js"
import "../css/DamageField.css"
import { Trunc } from "./utils/Trunc.js";

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const SetValueStr = "DamageValue";
const monsterLevelStr = "monsterLevelStr";
const monsterResStr = "monsterResStr";
const resReduction = "resReduction";
const defReduction = "defReduction";
const DamageField = () => {
  const props = { ...useSelector(selectSheet), ...useSelector(selectStats) }
  const dispatch = useDispatch();
  const updateSheet = updateSheetValue(dispatch);
  const updateType = updateSheetArray(dispatch);
  const updateValue = updateSheetArray(dispatch);
  const SetTypeValue = [SetTypeStr, SetValueStr];
  const SetTypeLength = props[SetTypeStr] ? props[SetTypeStr].length : 0
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
  const TableComponent = (tableProps) => {
    return (
      <table className="damageField__table">
        <thead>
          <tr>
            {[
              "Skill Name", "Type", "Damage Multiplier", "Reaction Multiplier", "Normal Hit", "Critical Hit",
            ].map((rowName, index) => <th key={index}>{rowName}</th>)}
            <th>{tableProps.add()}</th>
          </tr>

        </thead>
        <tbody>
          {tableProps.array.map((id, index) => {
            return DamageCalcField({ id, index, remove: tableProps.remove })
          })}
        </tbody>

      </table>
    )
  }
  const requiredFields = {
    "Player Level": props.LVL,
    "Monster Level": props[monsterLevelStr],
    "Monster Resistance": props[monsterResStr],
  }
  console.log(props)
  const missingArray =
    Object.keys(requiredFields).filter(key => !requiredFields[key])
  console.log(missingArray.join())
  const totRes = calcRes(props[monsterResStr], props[resReduction]);
  const totDef = calcDef(props.LVL, props[monsterLevelStr], props[defReduction]);
  return (
    <div>
      Monster Level:
      <NumberField
        onChange={updateSheet(monsterLevelStr)}
        defaultValue={props[monsterLevelStr]}
      />
        Monster Res (%):
      <NumberField
        onChange={updateSheet(monsterResStr)}
        defaultValue={props[monsterResStr]}
      />
        Res Reduction (%):
      <NumberField
        onChange={updateSheet(resReduction)}
        defaultValue={props[resReduction]}
      />
       Def Reduction (%):
      <NumberField
        onChange={updateSheet(defReduction)}
        defaultValue={props[defReduction]}
      />
      <div>
        Total ATK: {props.totalATK}{" "}
        Elemental Mastery: {props.EM || 0}{" "}
        Monster Res: {totRes}%{" "}
        Mob Defense: {Trunc((totDef) * 100)}%{" "}
      </div>
      {missingArray.length > 0 ? <div>Missing: {`${missingArray.join()}`}</div> : <></>}
      <MultiField
        initialLength={SetTypeLength}
        addEffect={add}
        removeEffect={remove}
      >
        <TableComponent />
      </MultiField>

    </div>
  );
}

export default DamageField;
