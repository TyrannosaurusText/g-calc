import React from "react";
import ArtifactField from "./ArtifactField.js";
import {
  flowerMain,
  plumeMain,
  sandsMain,
  gobletMain,
  circletMain,
} from "./Effects.js";

const views = [
  "Flower of Life",
  "Plume of Death",
  "Sands of Eon",
  "Goblet of Eonotherm",
  "Circlet of Logos",
];
const setEffect = "Set Effect";
const options = [flowerMain, plumeMain, sandsMain, gobletMain, circletMain];
class ArtifactsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: views[0] };
  }

  renderOnView = (name, component) => {
    return this.state.view == name ? component : <div />;
  };

  selectionButton = (elem) => {
    return (
      <button
        disabled={this.state.view === elem}
        onClick={() => this.setView(elem)}
      >
        {elem}
      </button>
    );
  };

  setView = (view) => this.setState({ view: view });

  render = () => {
    return (
      <div>
        <div>Artifact Stats</div>
        <div className="App-row">
          {options.map((_, index) => {
            return (
              this.selectionButton(views[index])
            );
          })}
          {this.selectionButton(setEffect)}
        </div>
        {options.map((_, index) => {
          return this.renderOnView(
            views[index],
            <ArtifactField mainStats={options[index]} />
          );
        })}
      </div>
    );
  };
}

export default ArtifactsView;