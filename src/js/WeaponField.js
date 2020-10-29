import React from "react";
import { weaponSub, weaponPassives } from "./utils/Effects.js";
import "../css/WeaponField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { Button } from "./utils/Button.js";
import withFieldProps from "./withFieldProps.js";
import { WeaponFieldName } from "./Names.js";

const weaponPassivesType = "weaponPassivesType";
const weaponPassivesValue = "weaponPassivesValue";

class WeaponField extends React.PureComponent {
  constructor(props) {
    super(props);
    var weaponPassivesID = Array(props.weaponPassivesType.length)
      .fill(0)
      .map((_, index) => index);
    this.state = {
      weaponPassivesID: weaponPassivesID,
      counter: weaponPassivesID.length,
    };
  }

  WeaponPassiveInput = (id, index) => {
    var onPassiveChange = (key, index) => (value) => {
      var passives = this.props[key];
      passives[index] = value;
      this.props.onChange(key)(passives);
    };
    const weaponPassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          this.props[weaponPassivesType][index],
          <NumberFieldOnLine
            onChange={onPassiveChange(weaponPassivesValue, index)}
            defaultValue={this.props[weaponPassivesValue][index]}
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
          defaultValue={this.props[weaponPassivesType][index]}
        />
      </div>
    );
  };

  AddEffect = () => {
    var ids = this.state.weaponPassivesID;
    var type = this.props[weaponPassivesType];
    var value = this.props[weaponPassivesValue];
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
    var type = this.props[weaponPassivesType];
    var value = this.props[weaponPassivesValue];
    ids.splice(index, 1);
    type.splice(index, 1);
    value.splice(index, 1);
    this.setState({ weaponPassivesID: ids });
    this.props.onChange(weaponPassivesType)(type);
    this.props.onChange(weaponPassivesValue)(value);
  };

  render = () => {
    const weaponSubstatType = "weaponSubstatType";
    const weaponSubstatValue = "weaponSubstatValue";
    const weaponSubstatInputComponent = hideIfFalsyOrNone(
      this.props[weaponSubstatType],
      <NumberFieldOnLine
        onChange={this.props.onChange(weaponSubstatValue)}
        defaultValue={this.props[weaponSubstatValue]}
      />
    );
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          <SelectionValueField
            array={weaponSub}
            onChange={this.props.onChange(weaponSubstatType)}
            component={weaponSubstatInputComponent}
            defaultValue={this.props[weaponSubstatType]}
          />
        </div>
        <div>
          Weapon Passive
          <Button onClick={() => this.AddEffect()}>Add Passive</Button>
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

export default withFieldProps(WeaponField, WeaponFieldName);
