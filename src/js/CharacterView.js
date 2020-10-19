import React from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
} from "./Names.js";

var CharacterView = (props) => {
  return (
    <div className="App__column section__body">
      <div className="App__row section__characterTop">
        <CharacterField
          data={props[CharacterFieldName]}
          onChange={props.onChange(CharacterFieldName)}
        />
        <WeaponField
          data={props[WeaponFieldName]}
          onChange={props.onChange(WeaponFieldName)}
        />
      </div>
      <ArtifactsView
        data={props[ArtifactFieldName]}
        onChange={props.onChange(ArtifactFieldName)}
      />
    </div>
  );
};

export default CharacterView;
