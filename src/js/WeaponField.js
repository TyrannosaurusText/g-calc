import React from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";

class WeaponField extends React.Component {
  constructor(props) {
    super(props);
    var data = props.data || {};
    data.weaponPassivesType = data.weaponPassivesType || [];
    data.weaponPassivesValue = data.weaponPassivesValue || [];
    var weaponPassivesID = Array(data.weaponPassivesType.length)
      .fill(0)
      .map((_, index) => index);
    this.state = {
      ...data,
      onChange: props.onChange,
      weaponPassivesID: weaponPassivesID,
      counter: weaponPassivesID.length,
    };
  }

  
  WeaponPassiveInput = (id, index) => {
    const weaponPassivesType = "weaponPassivesType";
    const weaponPassivesValue = "weaponPassivesValue";
    var onPassiveChange = (key, index) => (value) => {
      var passives = this.state[key];
      passives[index] = value;
      this.state.onChange(key)(passives);
    };
    const weaponPassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          this.state[weaponPassivesType][index],
          <NumberFieldOnLine
            onChange={onPassiveChange(weaponPassivesValue, index)}
            defaultValue={this.state[weaponPassivesValue][index]}
          />
        )}
        <button onClick={() => this.RemoveEffect(index)}>Remove</button>
      </>
    );
    return (
      <SelectionValueField
        key={id}
        selectionName={weaponPassivesType}
        onChange={onPassiveChange(weaponPassivesType, index)}
        array={weaponPassives}
        component={weaponPassiveInputComponent}
        defaultValue={this.state[weaponPassivesType][index]}
      />
    );
  };

  AddEffect = () => {
    var ids = this.state.weaponPassivesID;
    var type = this.state.weaponPassivesType;
    var value = this.state.weaponPassivesValue;
    ids.push(this.state.counter);
    type.push("None");
    value.push(undefined);
    this.setState({
      weaponPassivesID: ids,
      weaponPassivesType: type,
      weaponPassivesValue: value,
      counter: this.state.counter + 1,
    });
  };

  RemoveEffect = (index) => {
    var ids = this.state.weaponPassivesID;
    var type = this.state.weaponPassivesType;
    var value = this.state.weaponPassivesValue;
    ids.splice(index, 1);
    type.splice(index, 1);
    value.splice(index, 1);
    this.setState(
      {
        weaponPassivesID: ids,
        weaponPassivesType: type,
        weaponPassivesValue: value,
      },
      () => {
        localStorage.setItem(
          localStorageWeaponField,
          JSON.stringify(this.state)
        );
      }
    );
  };

  render = () => {
    const weaponSubstatType = "weaponSubstatType";
    const weaponSubstatValue = "weaponSubstatValue";
    const weaponSubstatInputComponent = hideIfFalsyOrNone(
      this.state[weaponSubstatType],
      <NumberFieldOnLine
        onChange={this.state.onChange(weaponSubstatValue)}
        defaultValue={this.state[weaponSubstatValue]}
      />
    );
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          <SelectionValueField
            array={weaponSub}
            onChange={this.state.onChange(weaponSubstatType)}
            component={weaponSubstatInputComponent}
            defaultValue={this.state[weaponSubstatType]}
          />
        </div>
        <div>
          Weapon Passive
          <button onClick={() => this.AddEffect()}>Add Passive</button>
        </div>
        <div>
          <div
            className={
              this.state.weaponPassivesID.length > 3
                ? "section__weaponPassive--scrollView"
                : "section__weaponPassive"
            }
          >
            {this.state.weaponPassivesID
              ? this.state.weaponPassivesID.map((id, index) => {
                  return this.WeaponPassiveInput(id, index);
                })
              : null}
          </div>
        </div>
      </div>
    );
  };
}

export default WeaponField;
