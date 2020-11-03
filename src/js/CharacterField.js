import React from "react";
import { characterAscensionStat, characterStats } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberField, NumberFieldOnLine } from "./utils/NumberField.js";
import "../css/CharacterField.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { updateStatTypeFactory, updateStatValueFactory, sheetUpdater } from './utils/updaters.js'

const CharacterField = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const ascensionStatType = "ascensionStatType";
  const ascensionStatValue = "ascensionStatValue";
  const updateType = updateStatTypeFactory(dispatch);
  const updateValue = updateStatValueFactory(dispatch);
  const ascStat = [ascensionStatType, ascensionStatValue]
  const updateAscType = sheetUpdater(ascStat, updateType, props);
  const updateAscValue = sheetUpdater(ascStat, updateValue, props);
  const ascensionStatInputComponent = (ascStatType, ascStatValue) =>
    hideIfFalsyOrNone(
      ascStatType,
      <>
        <div className="section__textAlignStart">{ascStatType || ""} Value</div>
        <NumberField
          defaultValue={ascStatValue}
          onChange={updateAscValue(ascensionStatValue)}
        />
      </>
    );
  return (
    <div className="block__characterTop--margin">
      <div> Base Stats </div>
      <div className="section_StatsMap--shrink">
        {characterStats.map((name) => {
          return (
            <div key={name} className="input_NumberField--spacing">
              <NumberFieldOnLine
                name={name}
                defaultValue={props[name]}
                onChange={updateValue(name, props[name], name)}
              // onChange={props.onChange(name)}
              />
            </div>
          );
        })}
      </div>
      <div>
        Ascension Stat
        <div />
        <div className="section__center">
          <div>
            <SelectionValueField
              array={characterAscensionStat}
              onChange={updateAscType(ascensionStatType)}
              component={ascensionStatInputComponent(
                props[ascensionStatType],
                props[ascensionStatValue]
              )}
              defaultValue={props[ascensionStatType]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterField;
