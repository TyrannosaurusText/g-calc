import React from "react";
import "./App.css";
import WeaponField from "./js/WeaponPassiveField.js";
import CharacterField from "./js/CharacterField.js";
import ArtifactsView from "./js/ArtifactsView.js";


function App() {
  return (
    <div className="App">
      <div className="App-column">
        <div className="App-row">
          <div>
            <CharacterField />
          </div>

          <div>
            <WeaponField />
          </div>
        </div>

        <ArtifactsView/>

      </div>
    </div>
  );
}

export default App;
