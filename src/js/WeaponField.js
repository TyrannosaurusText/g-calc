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
import { updateTypeFactory, updateValueFactory, arrayUpdater, sheetUpdater } from './utils/updaters.js'
import { MultiField } from "./utils/MultiField.js";

const weaponPassivesType = "weaponPassivesType";
const weaponPassivesValue = "weaponPassivesValue";
const weaponSubstatType = "weaponSubstatType";
const weaponSubstatValue = "weaponSubstatValue";

const WeaponField = () => {
  const props = { ...(useSelector(selectSheet).sheet) }
  const dispatch = useDispatch();
  const updateType = updateTypeFactory(dispatch);
  const updateValue = updateValueFactory(dispatch);
  const weaponPassiveTypeValue = [props[weaponPassivesType], props[weaponPassivesValue]]
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
  const changePassiveType = sheetUpdater(weaponPassiveTypeValue, updateValue);
  const changePassiveValue = sheetUpdater(weaponPassiveTypeValue, updateType);
  const add = () => {
    const typeUpdater = changePassiveType(weaponPassivesType)
    const valueUpdater = changePassiveValue(weaponPassivesValue)
    typeUpdater(props[weaponPassivesType].concat(undefined))
    valueUpdater(props[weaponPassivesValue].concat(undefined))
  };
  const remove = (index) => {
    const typeUpdater = changePassiveType(weaponPassivesType)
    const valueUpdater = changePassiveValue(weaponPassivesValue)
    var weaponPassiveValueArray = [...props[weaponPassivesValue]]
    var weaponPassiveTypeArray = [...props[weaponPassivesType]]
    weaponPassiveTypeArray.splice(index, 1)
    weaponPassiveValueArray.splice(index, 1)
    typeUpdater(weaponPassiveTypeArray)
    valueUpdater(weaponPassiveValueArray)
  };
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
        addEffect={add}
        removeEffect={remove}
      />
    </div>
  );
};

export default WeaponField
