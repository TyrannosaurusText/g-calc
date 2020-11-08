import React from "react";
import { characterAscensionStat, characterStats } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberField } from "./utils/NumberField.js";
import "../css/CharacterField.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { updateSheetAndStatsType, updateSheetAndStatsValue, sheetUpdater } from './utils/updaters.js'

const CharacterField = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const ascensionStatType = "ascensionStatType";
  const ascensionStatValue = "ascensionStatValue";
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const ascStat = [ascensionStatType, ascensionStatValue]
  const updateAscType = sheetUpdater(ascStat, updateType, props);
  const updateAscValue = sheetUpdater(ascStat, updateValue, props);
  const ascensionStatInputComponent = (ascStatType, ascStatValue) =>
    hideIfFalsyOrNone(
      ascStatType,
      <>
        {/* <tr>
          <td className="table__td">
            <div>VAL</div>
          </td>
        </tr> */}
        <tr>
          <td className={"table__td characterField__inputUpper"}>
            <div

            ></div>
            <NumberField
              className={"item__fillWidth"}
              defaultValue={ascStatValue}
              onChange={updateAscValue(ascensionStatValue)}
            />
          </td>
        </tr>

      </>
    );
  return (
    <div>
      <div> Base Stats </div>
      <table className="table__table item__fillWidth" >
        <tbody>
          {characterStats.map((name, index) => {
            return (
              <tr key={index}>
                <td className="table__td">{name}</td>
                <td className={"table__td"}>
                  <NumberField
                    name={name}
                    className={"item__fillWidth"}
                    defaultValue={props[name]}
                    onChange={updateValue(name, props[name], name)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table__table item__fillWidth">
        <tbody>
          <tr>
            <td className="table__td">
              Ascension Stat
              </td>
          </tr>
          <tr>
            <td className="table__td">
              <SelectionValueField
                array={characterAscensionStat}
                onChange={updateAscType(ascensionStatType)}
                defaultValue={props[ascensionStatType]}
              />
            </td>
          </tr>
          {ascensionStatInputComponent(
            props[ascensionStatType],
            props[ascensionStatValue]
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterField;
