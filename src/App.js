import React from "react";
import "./css/App.css";
import CharacterView from "./js/CharacterView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
} from "./js/Names.js";

const characterSheet1 = "CharacterSheet1";
const characterSheet2 = "CharacterSheet2";
const comparePage = "ComparePage";

var loadPage = (page) => {
  var data = JSON.parse(localStorage.getItem(page)) || {};
  data[WeaponFieldName] = data[WeaponFieldName] || '{}'
  data[ArtifactFieldName] = data[ArtifactFieldName] || '{}'
  data[CharacterFieldName] = data[CharacterFieldName] || '{}'
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
    this.state = { ...loadPage(characterSheet1), view: characterSheet1 };
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
    var currentPage = this.state.view;

    var data = JSON.stringify({
      [WeaponFieldName]: localStorage.getItem(WeaponFieldName) || {},
      [ArtifactFieldName]: localStorage.getItem(ArtifactFieldName) || {},
      [CharacterFieldName]: localStorage.getItem(CharacterFieldName) || {},
    });

    localStorage.setItem(currentPage, data);
  };

  changePage = (page) => {
    this.savePage();
    var data = loadPage(page);
    this.setState(
      {
        view: undefined,
        [WeaponFieldName]: undefined,
        [ArtifactFieldName]: undefined,
        [CharacterFieldName]: undefined,
      },
      () => {
        this.setState({
          view: page,
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
        <div className="App__row">
          <div className="section__navbar">
            <div className="App__column">
              <button onClick={() => this.changePage(characterSheet1)}>
                Character Sheet 1
              </button>
              <button onClick={() => this.changePage(characterSheet2)}>
                Character Sheet 2
              </button>
              <button onClick={() => this.comparePage()}>Compare</button>
            </div>
          </div>
          {this.state.view ? (
            <CharacterView
              WeaponField={this.state[WeaponFieldName]}
              ArtifactField={this.state[ArtifactFieldName]}
              CharacterField={this.state[CharacterFieldName]}
              onChange={this.onChange}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
