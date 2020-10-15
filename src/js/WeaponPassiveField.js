import React from "react";
import { weaponSub, weaponPassives } from "./Effects.js";
import "../css/WeaponPassiveField.css";
import { SelectionValueField } from "./SelectionValueField.js";
import { inputFieldOnLine } from "./InputField.js";

class WeaponField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weaponPassives: [0],
      counter: 1,
    };
  }

  updateSelection = (key) => (e) =>
    this.setState({
      [key]:
        e.target.value.localeCompare("None") === 0 ? undefined : e.target.value,
    });

  WeaponPassiveInput = (index) => {
    return SelectionValueField(
      weaponPassives,
      "weaponPassive",
      this.updateSelection,
      <>
        {inputFieldOnLine}
        <button onClick={() => this.RemoveEffect(index)}>Remove</button>
      </>,
      this.state["weaponPassive"]
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
    return (
      <div>
        <div>
          <div> Weapon Substat </div>
          {SelectionValueField(
            weaponSub,
            "weaponSub",
            this.updateSelection,
            inputFieldOnLine,
            this.state["weaponSub"]
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
