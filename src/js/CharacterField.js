import React from "react";
import { characterAscensionStat, characterStats } from "./Effects.js";
import { SelectionValueField } from "./SelectionValueField.js";
import {
  NumberField,
  NumberFieldOnLine,
} from "./NumberField.js";

const localStoreCharacterField = "CharacterField";
class CharacterField extends React.Component {
  constructor(props) {
    super(props);
    var val = JSON.parse(localStorage.getItem(localStoreCharacterField));
    this.state = { ...val };
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

  render = () => {
    const ascensionStat = "ascensionStat";
    const ascensionStatValue = "ascensionStatValue"; 
    console.log(this.state);
    return (
      <div>
        <div> Character Stats </div>
        <div className="section__textAlignEnd">
          {characterStats.map((name) => {
            return (
              <div key={name}>
                <NumberFieldOnLine
                  name={name}
                  defaultValue={this.state[name]}
                  onChange={this.onChange(name)}
                />
              </div>
            );
          })}
        </div>
        <div>
          Ascension Stat
          <div />
          <div className="section__textAlignEnd">
            {SelectionValueField(
              characterAscensionStat,
              ascensionStat,
              this.updateSelection,
              <>
                <div className="section__textAlignStart">
                  {this.state ? this.state[ascensionStat] : ""} Value
                </div>
                <NumberField 
                  defaultValue={this.state[ascensionStatValue]}
                  onChange={this.onChange(ascensionStatValue)}
                />
              </>,
              this.state[ascensionStat]
            )}
          </div>
        </div>
      </div>
    );
  };
}

export default CharacterField;
