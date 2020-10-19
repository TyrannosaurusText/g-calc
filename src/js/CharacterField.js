import React from "react";
import { characterAscensionStat, characterStats } from "./utils/Effects.js";
import { SelectionValueField, hideIfFalsyOrNone } from "./utils/SelectionValueField.js";
import { NumberField, NumberFieldOnLine } from "./utils/NumberField.js";
import { updateSelection } from "./utils/UpdateSelection.js";

const localStoreCharacterField = "CharacterField";
class CharacterField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data };
  }

  onChange = (key) => (value) => {
    this.setState({ [key]: value }, () => {
      localStorage.setItem(
        localStoreCharacterField,
        JSON.stringify(this.state)
      );
    });
  };

  render = () => {
    const ascensionStatType = "ascensionStatType";
    const ascensionStatValue = "ascensionStatValue";
    const ascensionStatInputComponent = hideIfFalsyOrNone(
      this.state[ascensionStatType],
      <>
        <div className="section__textAlignStart">
          {this.state ? this.state[ascensionStatType] : ""} Value
        </div>
        <NumberField
          defaultValue={this.state[ascensionStatValue]}
          onChange={this.onChange(ascensionStatValue)}
        />
      </>
    );
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
            <SelectionValueField
              array={characterAscensionStat}
              onChange={updateSelection(this.onChange, ascensionStatType)}
              component={ascensionStatInputComponent}
              defaultValue={this.state[ascensionStatType]}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default CharacterField;
