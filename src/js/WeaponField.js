import React from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateSheetAndStatsType, updateSheetAndStatsValue, arrayUpdater, sheetUpdater } from './utils/updaters.js'
import { MultiField, multifieldAdd, multifieldRemove } from "./utils/MultiField.js";

const weaponPassivesType = "weaponPassivesType";
const weaponPassivesValue = "weaponPassivesValue";
const weaponSubstatType = "weaponSubstatType";
const weaponSubstatValue = "weaponSubstatValue";

const WeaponField = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const weaponPassiveTypeValue = [weaponPassivesType, weaponPassivesValue]
  const weaponPassiveLength = props.weaponPassivesType ? props.weaponPassivesType.length : 0
  const WeaponPassiveInput = ({ id, index }) => {
    const onPassiveValueChange = arrayUpdater(weaponPassiveTypeValue, updateValue, props);
    const onPassiveTypeChange = arrayUpdater(weaponPassiveTypeValue, updateType, props);

    const weaponPassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          props[weaponPassivesType][index],
          <NumberFieldOnLine
            onChange={onPassiveValueChange(weaponPassivesValue, index)}
            defaultValue={props[weaponPassivesValue][index]}
          />
        )}
      </>
    );
    return (
      <div key={id}>
        <SelectionValueField
          key={id}
          selectionName={weaponPassivesType}
          onChange={onPassiveTypeChange(weaponPassivesType, index)}
          array={weaponPassives}
          component={weaponPassiveInputComponent}
          defaultValue={props[weaponPassivesType][index]}
        />
      </div>
    );
  };
  const changePassiveType = sheetUpdater(weaponPassiveTypeValue, updateValue, props);
  const changePassiveValue = sheetUpdater(weaponPassiveTypeValue, updateType, props);
  const multifieldFields = [
    [changePassiveType, weaponPassivesType],
    [changePassiveValue, weaponPassivesValue]
  ];
  const weaponSubstatInputComponent = hideIfFalsyOrNone(
    props[weaponSubstatType],
    <NumberFieldOnLine
      onChange={updateValue(
        props[weaponSubstatType],
        props[weaponSubstatValue],
        weaponSubstatValue
      )}
      defaultValue={props[weaponSubstatValue]}
    />
  );
  return (
    <div>
      <div>
        <div> Weapon Substat </div>
        <SelectionValueField
          array={weaponSub}
          onChange={updateType(
            props[weaponSubstatType],
            props[weaponSubstatValue],
            weaponSubstatType
          )}
          component={weaponSubstatInputComponent}
          defaultValue={props[weaponSubstatType]}
        />
      </div>
      <MultiField
        initialLength={weaponPassiveLength}
        title="Weapon Passive"
        buttonText="Add Passive"
        component={WeaponPassiveInput}
        addEffect={multifieldAdd(props, multifieldFields)}
        removeEffect={multifieldRemove(props, multifieldFields)}
      />
    </div>
  );
};

export default WeaponField
