import React from "react";
import "./App.css";
import WeaponField from "./js/WeaponPassiveField.js";
import CharacterField from "./js/CharacterField.js";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CharacterField/>
        </div>

        <div>
          <WeaponField />
        </div>
      </header>
    </div>
  );
}

export default App;
