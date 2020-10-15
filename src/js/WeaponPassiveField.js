import React from "react";
import { weaponSub, weaponPassives } from "./Effects.js";
import "../css/WeaponPassiveField.css"
class WeaponField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weaponPassives: [0],
      counter: 1,
    };
  }

  WeaponPassiveInput = (id, index) => {
    return (
      <div key={"weapon-passive-" + id}>
        <select id={"weapon-passive-" + id}>
          {weaponPassives.map((name) => {
            return (
              <option key={name} value={"weaponPassive_" + name}>
                {name}
              </option>
            );
          })}
        </select>{" "}
        Value <input type="text" />
        <button onClick={() => this.RemoveEffect(index)}>Remove</button>
      </div>
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
          <select id="weapon-substat">
            {weaponSub.map((name) => {
              return (
                <option key={name} value={"weaponSub_" + name}>
                  {name}
                </option>
              );
            })}
          </select>{" "}
          Value <input type="text" />
        </div>
        <div>
          {" "}
          Weapon Passive
          <button onClick={() => this.AddEffect()}>Add Passive</button>
        </div>
        <div>
          <div className={this.state.weaponPassives.length > 3 ? "section__weaponPassive--scrollView" :"section__weaponPassive" }>
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
