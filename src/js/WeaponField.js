import React, { useState } from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { Button } from "./utils/Button.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useSelector } from "react-redux";

const weaponPassivesType = "weaponPassivesType";
const weaponPassivesValue = "weaponPassivesValue";

const WeaponField = () => {
  const props = { ...(useSelector(selectSheet).sheet) }
  props.onChange = () => { };
  var [weaponPassivesID, setWPID] = useState(Array(props.weaponPassivesType ? props.weaponPassivesType.length : 0)
    .fill(0)
    .map((_, index) => index));
  var [counter, setCount] = useState(0)

  const WeaponPassiveInput = (id, index) => {
    var onPassiveChange = (key, index) => (value) => {
      var passives = props[key];
      passives[index] = value;
      props.onChange(key)(passives);
    };
    const weaponPassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          props[weaponPassivesType][index],
          <NumberFieldOnLine
            onChange={onPassiveChange(weaponPassivesValue, index)}
            defaultValue={props[weaponPassivesValue][index]}
          />
        )}
        <Button onClick={() => this.RemoveEffect(index)}>Remove</Button>
      </>
    );
    return (
      <div key={id}>
        <SelectionValueField
          key={id}
          selectionName={weaponPassivesType}
          onChange={onPassiveChange(weaponPassivesType, index)}
          array={weaponPassives}
          component={weaponPassiveInputComponent}
          defaultValue={props[weaponPassivesType][index]}
        />
      </div>
    );
  };

  const AddEffect = () => {
    var ids = weaponPassivesID;
    var type = props[weaponPassivesType];
    var value = props[weaponPassivesValue];
    ids.push(counter);
    type.push("None");
    value.push(undefined);
    this.setState({
      weaponPassivesID: ids,
      weaponPassivesType: type,
      weaponPassivesValue: value,
      counter: counter + 1,
    });
  };

  const RemoveEffect = (index) => {
    var ids = weaponPassivesID;
    var type = props[weaponPassivesType];
    var value = props[weaponPassivesValue];
    ids.splice(index, 1);
    type.splice(index, 1);
    value.splice(index, 1);
    this.setState({ weaponPassivesID: ids });
    props.onChange(weaponPassivesType)(type);
    props.onChange(weaponPassivesValue)(value);
  };

  const weaponSubstatType = "weaponSubstatType";
  const weaponSubstatValue = "weaponSubstatValue";
  const weaponSubstatInputComponent = hideIfFalsyOrNone(
    props[weaponSubstatType],
    <NumberFieldOnLine
      onChange={props.onChange(weaponSubstatValue)}
      defaultValue={props[weaponSubstatValue]}
    />
  );
  return (
    <div>
      <div>
        <div> Weapon Substat </div>
        <SelectionValueField
          array={weaponSub}
          onChange={props.onChange(weaponSubstatType)}
          component={weaponSubstatInputComponent}
          defaultValue={props[weaponSubstatType]}
        />
      </div>
      <div>
        Weapon Passive
          <Button onClick={() => this.AddEffect()}>Add Passive</Button>
      </div>
      <div>
        <div
          className={
            weaponPassivesID.length > 3
              ? "section__weaponPassive--scrollView"
              : "section__weaponPassive"
          }
        >
          {weaponPassivesID
            ? weaponPassivesID.map((id, index) => {
              return this.WeaponPassiveInput(id, index);
            })
            : null}
        </div>
      </div>
    </div>
  );
};

export default WeaponField
