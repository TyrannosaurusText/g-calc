import React from "react";
import ArtifactField from "./ArtifactField.js";
import SetEffectField from "./SetEffectField.js";
import {
  flowerMain,
  plumeMain,
  sandsMain,
  gobletMain,
  circletMain,
} from "./utils/Effects.js";
import { Button } from "./utils/Button.js";
import { ArtifactFieldName } from "./Names.js";

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
      <div>
        <div>Artifact Stats</div>
        <div className="section__App--row">
          {options.map((_, ButtonIndex) => {
            return this.selectionButton(views[ButtonIndex]);
          })}
          {this.selectionButton(setEffect)}
        </div>
        {options.map((_, ArtifactNum) => {
          var props = {
            onChange: this.props.onChange,
          };
          props[ArtifactFieldName] = {
            ...this.props[ArtifactFieldName],
            ArtifactNum: ArtifactNum,
            mainStats: options[ArtifactNum],
          };
          return this.renderOnView(views[ArtifactNum], <ArtifactField key={ArtifactNum} {...props} />);
        })}

        {this.renderOnView(
          setEffect,
          <SetEffectField {...this.props}/>
        )}
      </div>
    );
  };
}

export default ArtifactsView;
