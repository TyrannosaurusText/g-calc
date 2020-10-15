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
    console.log(this.state);
    return (
      <div>
        <div> Character Stats </div>
        <div className="section__textAlignEnd">
          {characterStats.map((name) => {
            return InputField(name);
          })}
        </div>
        <div>
          Ascension Stat
          <div />
          <div className="section__textAlignEnd">
            {SelectionValueField(
              characterAscensionStat,
              "ascensionStat",
              this.updateSelection
              <>
              <div className="section__textAlignStart">{this.state["ascensionStat"]} Value</div>
              {/* <div className="left"> */}
              <input type="text" />
              {/* </div> */}
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
