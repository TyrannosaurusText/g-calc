import React from "react";
import "./css/App.css";
import CharacterView from "./js/CharacterView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
  DamageFieldName,
} from "./js/Names.js";
import TotalStats from "./js/TotalStats.js";
import { Button } from "./js/utils/Button.js";
import {
  initialDamageField,
  initialCharacterField,
  initialArtifactField,
  initialWeaponField,
} from "./js/utils/initialValues.js";

import { init } from "./js/utils/fieldInitializer.js";

const characterSheet1 = "CharacterSheet1";
const characterSheet2 = "CharacterSheet2";
const characterSheet3 = "CharacterSheet3";
const characterSheet4 = "CharacterSheet4";
const characterSheet5 = "CharacterSheet5";
const comparePage = "ComparePage";

const avaliableFields = [
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
  DamageFieldName,
];
const initialValues = {
  [WeaponFieldName]: initialWeaponField,
  [ArtifactFieldName]: initialArtifactField,
  [CharacterFieldName]: initialCharacterField,
  [DamageFieldName]: initialDamageField,
};
// const newWeaponField = JSON.stringify(initialWeaponField);
// const newArtifactField = JSON.stringify(initialArtifactField);
// const newCharacterField = JSON.stringify(initialCharacterField);
// const newDamageField = JSON.stringify(initialDamageField);

var loadPage = (page) => {
  var data = localStorage.getItem(page);
  data = data === null ? {} : JSON.parse(data);

  // localStorage.setItem(WeaponFieldName, data[WeaponFieldName]);
  // localStorage.setItem(ArtifactFieldName, data[ArtifactFieldName]);
  // localStorage.setItem(CharacterFieldName, data[CharacterFieldName]);

  for (var key in data) {
    data[key] = JSON.parse(data[key]);
  }
  //update for older versions
  avaliableFields.map((fieldName) => {
    init(data, fieldName, initialValues[fieldName]);
  });
  return data;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...loadPage(characterSheet1),
      characterData: characterSheet1,
    };
    window.addEventListener("unload", this.savePage);
  }

  onChange = (field) => (key) => (value) => {
    var fieldData = this.state[field];
    if (undefined == fieldData) fieldData = {};
    fieldData[key] = value;
    console.log(field, fieldData);

    this.setState({ [field]: fieldData }, () => {
      localStorage.setItem(field, JSON.stringify(fieldData));
    });
  };

  savePage = () => {
    var currentPage = this.state.characterData;
    var data = {};
    avaliableFields.map((fieldName) => {
      data[fieldName] = localStorage.getItem(fieldName);
    });
    localStorage.setItem(currentPage, JSON.stringify(data));
  };

  changePage = (page) => {
    this.savePage();
    var data = loadPage(page);
    var unloadData = { characterData: undefined };
    avaliableFields.map((fieldName) => {
      unloadData[fieldName] = undefined;
    });
    var loadNewData = { characterData: page };
    avaliableFields.map((fieldName) => {
      unloadData[fieldName] = data[fieldName] || {};
    });
    this.setState(unloadData, () => {
      this.setState(loadNewData);
    });
  };

  render() {
    const CharacterViewProps = {};
    avaliableFields.map((fieldName) => {
      CharacterViewProps[fieldName] = this.state[fieldName];
    });
    return (
      <div className="App">
        <div className="section__App--row">
          <div className="section__navbar">
            <div className="section__App--column">
              <Button onClick={() => this.changePage(characterSheet1)}>
                Character Sheet 1
              </Button>
              <Button onClick={() => this.changePage(characterSheet2)}>
                Character Sheet 2
              </Button>
              <Button onClick={() => this.changePage(characterSheet3)}>
                Character Sheet 3
              </Button>
              <Button onClick={() => this.changePage(characterSheet4)}>
                Character Sheet 4
              </Button>
              <Button onClick={() => this.changePage(characterSheet5)}>
                Character Sheet 5
              </Button>
              <Button onClick={() => this.comparePage()}>Compare</Button>
            </div>
          </div>
          {this.state.characterData ? (
            <CharacterView {...CharacterViewProps} onChange={this.onChange} />
          ) : (
            <> </>
          )}
          <TotalStats data={this.state}></TotalStats>
        </div>
      </div>
    );
  }
}

export default App;
