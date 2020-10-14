import React from "react";

var InputField = (name) => {
  return (
    <div key={name}>
      {name} <input type="text" />
    </div>
  );
};

var characterStats = [
  "HP",
  "ATK",
  "DEF",
  "Crit Rate",
  "Crit DMG",
  "Energy Recharge",
  "Elemental Mastery",
  "Ele/Phys. DMG %",
  "% ATK",
  "%HP",
  "%DEF",
  "Healing Bonus",
];
var WeaponSub = [
  "Crit Rate",
  "Crit DMG",
  "Energy Recharge",
  "Elemental Mastery",
  "Ele/Phys. DMG %",
  "% ATK",
  "%HP",
  "%DEF",
];

var ArtifactSub = [
  "HP",
  "ATK",
  "DEF",
  "Crit Rate",
  "Crit DMG",
  "Energy Recharge",
  "Elemental Mastery",
  "% ATK",
  "%HP",
  "%DEF",
  "Healing Bonus",
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="left">
          <div> Character Stats </div>
          <div>
            {characterStats.map((name) => {
              return InputField(name);
            })}
          </div>

          <div className="center">
            <div>
              <div> Weapon Substat </div>
              <select id="weapon-substat">
                {WeaponSub.map((name) => {
                  return <option key={name} value={"weaponSub_" + name}>{name}</option>;
                })}
              </select>
            </div>
            <div>
              <select id="weapon-passive">
                {WeaponSub.map((name) => {
                  return (
                    <option key={name} value={"weaponPassive_" + name}>{name}</option>
                  );
                })}
              </select>{" "}
              Value <input type="text" />
            </div>
          </div>
        </div>
        <div> Weapon Passive </div>
      </header>
    </div>
  );
}

export default App;
