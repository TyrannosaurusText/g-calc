import React from "react";
import { setEffects } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { updateStatTypeFactory, updateStatValueFactory, arrayUpdater, sheetUpdater } from './utils/updaters.js'
import { MultiField } from "./utils/MultiField.js";
import "../css/SetEffectField.css";
const artifactSetEffectType = "artifactTypes-5";
const artifactSetEffectValue = "artifactValues-5";

const SetEffectField = () => {
  const props = { ...(useSelector(selectSheet)) }
  const dispatch = useDispatch();
  const updateType = updateStatTypeFactory(dispatch);
  const updateValue = updateStatValueFactory(dispatch);

  const artifactSetEffectLength = props.artifactSetEffectType ? props.artifactSetEffectType.length : 0
  const artifactSetEffectTypeValue = [props[artifactSetEffectType], props[artifactSetEffectValue]]
  const artifactSetEffectInputComponent = ({ id, index }) => {
    const onPassiveValueChange = arrayUpdater(artifactSetEffectTypeValue, updateValue, props);
    const onPassiveTypeChange = arrayUpdater(artifactSetEffectTypeValue, updateType, props);
    const PassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          props[artifactSetEffectType][index],
          <NumberFieldOnLine
            onChange={onPassiveValueChange(artifactSetEffectValue, index)}
            defaultValue={props[artifactSetEffectValue][index]}
          />
        )}
      </>
    );
    return (
      <div key={id}>
        <SelectionValueField
          selectionName={artifactSetEffectType}
          onChange={onPassiveTypeChange(artifactSetEffectType, index)}
          array={setEffects}
          component={PassiveInputComponent}
          defaultValue={props[artifactSetEffectType][index]}
        />
      </div>
    );
  };
  const changePassiveType = sheetUpdater(artifactSetEffectTypeValue, updateValue, props);
  const changePassiveValue = sheetUpdater(artifactSetEffectTypeValue, updateType, props);
  const add = () => {
    const typeUpdater = changePassiveType(artifactSetEffectType)
    const valueUpdater = changePassiveValue(artifactSetEffectValue)
    typeUpdater(props[artifactSetEffectType].concat(undefined))
    valueUpdater(props[artifactSetEffectValue].concat(undefined))
  };
  const remove = (index) => {
    const typeUpdater = changePassiveType(artifactSetEffectType)
    const valueUpdater = changePassiveValue(artifactSetEffectValue)
    var weaponPassiveValueArray = [...props[artifactSetEffectValue]]
    var weaponPassiveTypeArray = [...props[artifactSetEffectType]]
    weaponPassiveTypeArray.splice(index, 1)
    weaponPassiveValueArray.splice(index, 1)
    typeUpdater(weaponPassiveTypeArray)
    valueUpdater(weaponPassiveValueArray)
  };
  return (
    <div >
      <MultiField
        initialLength={artifactSetEffectLength}
        title="Passive Set Effects"
        buttonText="Add Passive"
        wrapperClass="setEffect--multifield"
        component={artifactSetEffectInputComponent}
        addEffect={add}
        removeEffect={remove}
      />
    </div>
  );
}

export default SetEffectField 
