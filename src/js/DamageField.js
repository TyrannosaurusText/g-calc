import React from "react";

import { NumberField } from "./utils/NumberField.js";
import { MultiField, multifieldAdd, multifieldRemove } from "./utils/MultiField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSheetArray,
  sheetUpdater,
  updateSheetValue,
} from "./utils/updaters.js";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { DamageCalcField, calcDef, calcRes } from "./DamageCalcField.js";
import "../css/DamageField.css";
import { Trunc } from "./utils/Trunc.js";

const TalentName = "TalentName";
const DamageTypeStr = "DamageType";
const TalentMultiplierStr = "DamageValue";
const ReactionMultipliers = "ReactionMultipliers";
const monsterLevelStr = "monsterLevelStr";
const monsterResStr = "monsterResStr";
const resReduction = "resReduction";
const defReduction = "defReduction";
const DamageField = () => {
  const props = { ...useSelector(selectSheet), ...useSelector(selectStats) };
  const dispatch = useDispatch();
  const updateSheet = updateSheetValue(dispatch);
  const updateType = updateSheetArray(dispatch);
  const updateValue = updateSheetArray(dispatch);
  const SetTypeValue = [DamageTypeStr, TalentMultiplierStr];
  const SetTypeLength = props[DamageTypeStr] ? props[DamageTypeStr].length : 0;
  const changeDamageType = sheetUpdater(SetTypeValue, updateValue, props);
  const changeDamageValue = sheetUpdater(SetTypeValue, updateType, props);

  const multifieldFields = [
    [changeDamageValue, TalentName],
    [changeDamageType, DamageTypeStr, "None"],
    [changeDamageValue, TalentMultiplierStr],
    [changeDamageValue, ReactionMultipliers, "None"]
  ];

  const TableComponent = (tableProps) => {
    return (
      <table className="table__table">
        <thead>
          <tr>
            {[
              "Talent",
              "Type",
              "Damage Multiplier",
              "Reaction Multiplier",
              "Normal Hit",
              "Critical Hit",
            ].map((rowName, index) => (
              <th className="table__th" key={index}>
                {rowName}
              </th>
            ))}
            <th> {tableProps.add()} </th>
          </tr>
        </thead>
        <tbody>
          {tableProps.array.map((id, index) => {
            return DamageCalcField({ id, index, remove: tableProps.remove });
          })}
        </tbody>
      </table>
    );
  };
  const requiredFields = {
    "Player Level": props.LVL,
    "Monster Level": props[monsterLevelStr],
    "Monster Resistance": props[monsterResStr],
  };
  const missingArray = Object.keys(requiredFields).filter(
    (key) => undefined === requiredFields[key]
  );
  const totRes = calcRes(props[monsterResStr], props[resReduction]);
  const totDef = calcDef(
    props.LVL,
    Math.max(1, props[monsterLevelStr]),
    props[defReduction]
  );
  const mobDefProps = [{ minValue: 1 }, {}, {}, {}]
  const mobDefInputFields = [monsterLevelStr,
    monsterResStr,
    resReduction,
    defReduction].map((key, index) => {
      return (
        <td key={index} className="table__td">
          <NumberField
            onChange={updateSheet(key)}
            defaultValue={props[key]}
            {...mobDefProps[index]}
          />
        </td>
      )
    })
  return (
    <div>
      <table className="table__table">
        <thead>
          <tr>
            {
              [
                'Monster Lvl',
                'Monster Res(%)',
                'Res Reduction(%)',
                'Def Reduction(%)',
                'Total Res',
                'Monster Defense'
              ].map((key, index) => {
                return (
                  <th key={index} className="table__th">
                    {key}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            {mobDefInputFields}
            <td className="table__td">
              {totRes}%
            </td>
            <td className="table__td">
              {Trunc((1 - totDef) * 100)}%
            </td>
          </tr>
        </tbody>
      </table>


      {missingArray.length > 0 ? (
        <div> Missing : {`${missingArray.join()}`} </div>
      ) : (
          <></>
        )}
      <MultiField
        initialLength={SetTypeLength}
        addEffect={multifieldAdd(props, multifieldFields)}
        removeEffect={multifieldRemove(props, multifieldFields)}
      >
        <TableComponent />
      </MultiField>
    </div>
  );
};

export default DamageField;
