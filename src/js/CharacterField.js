import React from "react";
import { characterAscensionStat, characterStats } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberField, NumberFieldOnLine } from "./utils/NumberField.js";
import "../css/CharacterField.css";
class CharacterField extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    const ascensionStatType = "ascensionStatType";
    const ascensionStatValue = "ascensionStatValue";
    const ascensionStatInputComponent = hideIfFalsyOrNone(
      this.props[ascensionStatType],
      <>
        <div className="section__textAlignStart">
          {this.props ? this.props[ascensionStatType] : ""} Value
        </div>
        <NumberField
          defaultValue={this.props[ascensionStatValue]}
          onChange={this.props.onChange(ascensionStatValue)}
        />
      </>
    );
    return (
      <div className="block__characterTop--margin">
        <div> Base Stats </div>
        <div className="section_StatsMap--shrink">
          {characterStats.map((name) => {
            return (
              <div key={name} className="input_NumberField--spacing">
                <NumberFieldOnLine
                  name={name}
                  defaultValue={this.props[name]}
                  onChange={this.props.onChange(name)}
                />
              </div>
            );
          })}
        </div>
        <div>
          Ascension Stat
          <div />
          <div className="section__center">
            <div>
              <SelectionValueField
                array={characterAscensionStat}
                onChange={this.props.onChange(ascensionStatType)}
                component={ascensionStatInputComponent}
                defaultValue={this.props[ascensionStatType]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default CharacterField;
