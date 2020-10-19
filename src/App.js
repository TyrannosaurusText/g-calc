import React from "react";
import "./css/App.css";
import CharacterView from "./js/CharacterView.js";

const localStoreCharacterField = "CharacterField";
const localStorageArtifactField = "ArtifactField";
const localStorageWeaponField = "WeaponField";

var loadPage = (page) => {
  var data = JSON.parse(localStorage.getItem(page)) || {};
  localStorage.setItem(localStorageWeaponField, data.weapon || "{}");
  localStorage.setItem(localStorageArtifactField, data.artifact || "{}");
  localStorage.setItem(localStoreCharacterField, data.character || "{}");
  for (var key in data) {
      data[key] = JSON.parse(data[key]);
  }
  
  return data;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    const characterSheet1 = "CharacterSheet1";
    this.state = { view: "CharacterField1", ...loadPage(characterSheet1) };
  }

  componentdidMount() {
    window.addEventListener("beforeunload", this.savePage());
  }

  savePage = () => {
    var currentPage = this.state.view;
    
    var data = JSON.stringify({
      weapon: localStorage.getItem(localStorageWeaponField) || {},
      artifact: localStorage.getItem(localStorageArtifactField) || {},
      character: localStorage.getItem(localStoreCharacterField) || {},
    });

    localStorage.setItem(currentPage, data);
  };

  changePage = (page) => {
    this.savePage();
    var { weapon, character, artifact } = loadPage(page);
    this.setState(
      {
        view: undefined,
        weapon: undefined,
        artifact: undefined,
        character: undefined,
      },
      () => {
        this.setState({
          view: page,
          weapon: weapon || {},
          character: character || {},
          artifact: artifact || {},
        });
      }
    );
  };

  render() {
    const characterSheet1 = "CharacterSheet1";
    const characterSheet2 = "CharacterSheet2";
    const comparePage = "ComparePage";
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
              view={this.state.view}
              character={this.state.character}
              artifact={this.state.artifact}
              weapon={this.state.weapon}
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
