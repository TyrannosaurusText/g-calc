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

  updateSelection = (key) => (e) => {
    this.setState(
      {
        [key]:
          e.target.value.localeCompare("None") === 0
            ? undefined
            : e.target.value,
      },
      () => {
        localStorage.setItem(
          localStorageWeaponField,
          JSON.stringify(this.state)
        );
      }
    );
  };

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
    const weaponPassiveId = `weaponPassive-${index}`;
    const weaponPassiveValue = `weaponPassiveValue-${index}`;
    const weaponPassiveInputComponent = (
      <>
        <NumberFieldOnLine
          name={weaponPassive}
          onChange={this.onChange(weaponPassive)}
          defaultValue={this.state[weaponPassive]}
        />
        <button onClick={() => this.RemoveEffect(index)}>Remove</button>
      </>
    );
    return (
      <SelectionValueField
        key={weaponPassiveId}
        selectionName={weaponPassiveId}
        onChange={this.updateSelection}
        array={weaponPassives}
        fieldValue={this.state[weaponPassiveValue]}
        component={weaponPassiveInputComponent}
        defaultValue={this.state[weaponPassiveId]}
      />
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
    const weaponSubstatValue = weaponSubstatValue;
    const weaponSubstatInputComponent = (
      <NumberFieldOnLine
        name={weaponSubstat}
        onChange={this.onChange(weaponSubstat)}
        defaultValue={this.state[weaponSubstat]}
      />
    );
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          <SelectionValueField
            array={weaponSub}
            onChange={this.updateSelection}
            fieldValue={this.state[weaponSubstatValue]}
            component={weaponSubstatInputComponent}
            defaultValue={this.state[weaponSubstat]}
          />
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
