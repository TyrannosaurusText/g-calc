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
import { updateTypeFactory, updateValueFactory } from './utils/updaters.js'
const CharacterField = () => {
  const props = { ...(useSelector(selectSheet).sheet) }
  const dispatch = useDispatch();
  const ascensionStatType = "ascensionStatType";
  const ascensionStatValue = "ascensionStatValue";
  const updateType = updateTypeFactory(dispatch);
  const updateValue = updateValueFactory(dispatch);
  const ascensionStatInputComponent = (ascStatType, ascStatValue) =>
    hideIfFalsyOrNone(
      ascStatType,
      <>
        <div className="section__textAlignStart">{ascStatType || ""} Value</div>
        <NumberField
          defaultValue={ascStatValue}
          onChange={updateValue(ascStatType, ascStatValue, ascensionStatValue)}
        // onChange={props.onChange(ascensionStatValue)}
        />
      </>
    );
  return (
    <div className="block__characterTop--margin">
      <div> Base Stats </div>
      <div className="section_StatsMap--shrink">
        {characterStats.map((name) => {
          console.log(name, props[name], props)
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
              onChange={updateType(
                props[ascensionStatType],
                props[ascensionStatValue],
                ascensionStatType
              )}
              // onChange={props.onChange(ascensionStatType)}
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
