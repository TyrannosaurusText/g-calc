import React from "react";
import ArtifactField from "./ArtifactField.js";
import {
  flowerMain,
  plumeMain,
  sandsMain,
  gobletMain,
  circletMain,
} from "./utils/Effects.js";
import { Button } from "./utils/Button.js";

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
    return this.state.view == name ? component : <div key={name} />;
  };

  selectionButton = (elem) => {
    return (
      <Button
        key={elem}
        disabled={this.state.view === elem}
        onClick={() => this.setView(elem)}
      >
        {elem}
      </Button>
    );
  };

  setView = (view) => this.setState({ view: view });

  render = () => {
    return (
      <div >
        <div>Artifact Stats</div>
        <div className="App__row">
          {options.map((_, index) => {
            return this.selectionButton(views[index]);
          })}
          {this.selectionButton(setEffect)}
        </div>
        {options.map((_, index) => {
          return this.renderOnView(
            views[index],
            <ArtifactField
              {...this.props.data}
              onChange={this.props.onChange}
              key={index}
              index={index}
              mainStats={options[index]}
            />
          );
        })}
      </div>
    );
  };
}

export default ArtifactsView;
