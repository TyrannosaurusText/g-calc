import React from "react";
import { characterAscensionStat, characterStats } from "./Effects.js";
import { SelectionValueField } from "./SelectionValueField.js";

var InputField = (name) => {
  return (
    <div key={name}>
      {name} <input type="text" />
    </div>
  );
};
class CharacterField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ascensionStat: undefined };
  }
  updateSelection = (key) => (e) =>
    this.setState({
      [key]:
        e.target.value.localeCompare("None") === 0 ? undefined : e.target.value,
    });

  render = () => {
    return (
      <div>
        <div> Character Stats </div>
        <div className="left">
          {characterStats.map((name) => {
            return InputField(name);
          })}
        </div>
        <div>
          Ascension Stat
          <div />
          <div className="left">
            {SelectionValueField(
              characterAscensionStat,
              "ascensionStat",
              this.updateSelection,
              <>
              <div>Stat Value</div>
              <div className="left">
              <input type="text" />
              </div>
              </>,
              this.state["ascensionStat"]
            )}
          </div>
        </div>
      </div>
    );
  };
}

export default CharacterField;
