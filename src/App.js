import React from "react";
import "./css/App.css";
import CharacterView from "./js/CharacterView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
} from "./js/Names.js";
import TotalStats from "./js/TotalStats.js";
import { Button } from "./js/utils/Button.js";

const characterSheet1 = "CharacterSheet1";
const characterSheet2 = "CharacterSheet2";
const characterSheet3 = "CharacterSheet3";
const characterSheet4 = "CharacterSheet4";
const characterSheet5 = "CharacterSheet5";
const comparePage = "ComparePage";
const newWeaponField = JSON.stringify({
  weaponSubstatType: "None",
  weaponPassivesType: [],
  weaponPassivesValue: [],
});
const newArtifactField = (() => {
  var obj = {};
  Array(5)
    .fill(0)
    .map((_, index) => {
      obj[`artifactTypes-${index}`] = Array(5).fill(null);
      obj[`artifactValues-${index}`] = Array(5).fill(0);
    });
  obj[`artifactTypes-5`] = [];
  obj[`artifactValues-5`] = [];
  return JSON.stringify(obj);
})();
const newCharacterField = JSON.stringify({
  ascensionStatType: "None",
  ascensionStatValue: 0,
});

var loadPage = (page) => {
  var data = localStorage.getItem(page);
  data =
    data === null
      ? {
          [WeaponFieldName]: newWeaponField,
          [ArtifactFieldName]: newArtifactField,
          [CharacterFieldName]: newCharacterField,
        }
      : JSON.parse(data);
  localStorage.setItem(WeaponFieldName, data[WeaponFieldName]);
  localStorage.setItem(ArtifactFieldName, data[ArtifactFieldName]);
  localStorage.setItem(CharacterFieldName, data[CharacterFieldName]);

  for (var key in data) {
    data[key] = JSON.parse(data[key]);
  }

  return data;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...loadPage(characterSheet1), characterData: characterSheet1 };
    window.addEventListener("unload", this.savePage);
  }

  onChange = (field) => (key) => (value) => {
    var fieldData = this.state[field];
    fieldData[key] = value;
    this.setState({ [field]: fieldData }, () => {
      localStorage.setItem(field, JSON.stringify(fieldData));
    });
  };

  savePage = () => {
    var currentPage = this.state.characterData;

    var data = JSON.stringify({
      [WeaponFieldName]:
        localStorage.getItem(WeaponFieldName) || newWeaponField,
      [ArtifactFieldName]:
        localStorage.getItem(ArtifactFieldName) || newArtifactField,
      [CharacterFieldName]:
        localStorage.getItem(CharacterFieldName) || newCharacterField,
    });

    localStorage.setItem(currentPage, data);
  };

  changePage = (page) => {
    this.savePage();
    var data = loadPage(page);
    this.setState(
      {
        characterData: undefined,
        [WeaponFieldName]: undefined,
        [ArtifactFieldName]: undefined,
        [CharacterFieldName]: undefined,
      },
      () => {
        this.setState({
          characterData: page,
          [WeaponFieldName]: data[WeaponFieldName] || {},
          [ArtifactFieldName]: data[ArtifactFieldName] || {},
          [CharacterFieldName]: data[CharacterFieldName] || {},
        });
      }
    );
  };

  render() {
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
            <CharacterView
              WeaponField={this.state[WeaponFieldName]}
              ArtifactField={this.state[ArtifactFieldName]}
              CharacterField={this.state[CharacterFieldName]}
              onChange={this.onChange}
            />
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
