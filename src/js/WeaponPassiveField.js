import React from "react";
import { weaponSub, weaponPassives } from "./Effects.js";
import "../css/WeaponPassiveField.css";
import { SelectionValueField } from "./SelectionValueField.js";
import { NumberFieldOnLine } from "./NumberField.js";

const localStorageWeaponField = "WeaponField";
class WeaponField extends React.Component {
  constructor(props) {
    super(props);
    var val = JSON.parse(localStorage.getItem(localStorageWeaponField));
    this.state = {
      ...val,
      weaponPassives: [0],
      counter: 1,
    };
  }

  updateSelection = (key) => (e) =>
    this.setState({
      [key]:
        e.target.value.localeCompare("None") === 0 ? undefined : e.target.value,
    });

  onChange = (key) => (value) => {
    this.setState({ [key]: value }, () => {
      localStorage.setItem(
        localStoreCharacterField,
        JSON.stringify(this.state)
      );
    });
  };
  WeaponPassiveInput = (index) => {
    const weaponPassive = weaponPassive;
    return SelectionValueField(
      weaponPassives,
      weaponPassive +'-'+ index,
      this.updateSelection,
      <>
        <NumberFieldOnLine
          name={weaponPassive}
          onChange={this.onChange(weaponPassive)}
          defaultValue={this.state[weaponPassive]}
        />
        <button onClick={() => this.RemoveEffect(index)}>Remove</button>
      </>,
      this.state[weaponPassive]
    );
  };

  AddEffect = () => {
    var passives = this.state.weaponPassives;
    passives.push(this.state.counter);
    this.setState({
      weaponPassives: passives,
      counter: this.state.counter + 1,
    });
  };

  RemoveEffect = (index) => {
    var passives = this.state.weaponPassives;
    passives.splice(index, 1);
    this.setState({
      weaponPassives: passives,
    });
  };

  render = () => {
    const weaponSubstat = "weaponSubstat";
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          {SelectionValueField(
            weaponSub,
            weaponSubstat,
            this.updateSelection,
            <NumberFieldOnLine
            name={weaponSubstat}
            onChange={this.onChange(weaponSubstat)}
            defaultValue={this.state[weaponSubstat]}
          />,
            this.state[weaponSubstat]
          )}
        </div>
        <div>
          Weapon Passive
          <button onClick={() => this.AddEffect()}>Add Passive</button>
        </div>
        <div>
          <div
            className={
              this.state.weaponPassives.length > 3
                ? "section__weaponPassive--scrollView"
                : "section__weaponPassive"
            }
          >
            {this.state.weaponPassives.map((id, index) => {
              return this.WeaponPassiveInput(id, index);
            })}
          </div>
        </div>
      </div>
    );
  };
}

export default WeaponField;
