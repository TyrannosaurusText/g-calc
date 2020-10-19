import React from "react";
import WeaponField from "./WeaponPassiveField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";


var CharacterView = (props) => {
    return (
      <div className="App__column section__body">
        <div className="App__row section__characterTop">
          <CharacterField data={props.character} />
          <WeaponField data={props.weapon} />
        </div>
        <ArtifactsView data={props.artifact} />
      </div>
    );
  };

export default CharacterView;
