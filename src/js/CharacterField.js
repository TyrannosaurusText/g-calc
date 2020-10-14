import React from "react";
import { weaponSub, characterStats } from "./Effects.js";
var InputField = (name) => {
    return (
      <div key={name}>
        {name} <input type="text" />
      </div>
    );
  };
class CharacterField extends React.Component {
  
  render = () => {
    return (
        <div>
          <div> Character Stats </div>
          <div className="left">
            {characterStats.map((name) => {
              return InputField(name);
            })}
            Ascension Stat
            <select id="ascension-substat">
              {weaponSub.map((name) => {
                return (
                  <option key={name} value={"ascensionStat_" + name}>
                    {name}
                  </option>
                );
              })}
            </select>
            {InputField("Value")}
          </div>
        </div>
    );
  };
}

export default CharacterField;
