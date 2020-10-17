import React from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponPassiveField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { updateSelection } from "./utils/UpdateSelection.js";

const localStorageWeaponField = "WeaponField";
class WeaponField extends React.Component {
  constructor(props) {
    super(props);
    var props = JSON.parse(localStorage.getItem(localStorageWeaponField)) || {};
    props.weaponPassivesType = props.weaponPassivesType || [];
    props.weaponPassivesValue = props.weaponPassivesValue || [];
    var weaponPassivesID = Array(props.weaponPassivesType.length)
      .fill(0)
      .map((_, index) => index);
    this.state = {
      ...props,
      weaponPassivesID: weaponPassivesID,
      counter: weaponPassivesID.length,
    };
  }

  onChange = (key) => (value) => {
    this.setState({ [key]: value }, () => {
      localStorage.setItem(localStorageWeaponField, JSON.stringify(this.state));
    });
  };

  onPassiveChange = (key, index) => (value) => {
    var passives = this.state[key];
    passives[index] = value;
    this.onChange(key)(passives);
  };

  WeaponPassiveInput = (id, index) => {
    const weaponPassivesType = "weaponPassivesType";
    const weaponPassivesValue = "weaponPassivesValue";
    const weaponPassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          this.state[weaponPassivesType][index],
          <NumberFieldOnLine
            onChange={this.onPassiveChange(weaponPassivesValue, index)}
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
        onChange={updateSelection(
          this.onPassiveChange,
          weaponPassivesType,
          index
        )}
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
        onChange={this.onChange(weaponSubstatValue)}
        defaultValue={this.state[weaponSubstatValue]}
      />
    );
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          <SelectionValueField
            array={weaponSub}
            onChange={updateSelection(this.onChange, weaponSubstatType)}
            component={weaponSubstatInputComponent}
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
