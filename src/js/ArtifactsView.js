import React, { useState } from "react";
import ArtifactField from "./ArtifactField.js";
import SetEffectField from "./SetEffectField.js";
import "../css/ArtifactView.css";
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

const ArtifactsView = () => {
  const [view, setView] = useState(views[0]);
  const renderOnView = (name, component) => {
    return view === name ? component : <div key={name} />;
  };
  const selectionButton = (elem) => {
    return (
      <Button
        className="artifact__buttons"
        key={elem}
        disabled={view === elem}
        onClick={() => setView(elem)}
      >
        {elem}
      </Button>
    );
  };

  return (
    <>
      <div>
        <span className="section__App--row">
          Artifacts
          {options.map((_, ButtonIndex) => {
            return selectionButton(views[ButtonIndex]);
          })}
          {selectionButton(setEffect)}
        </span>
        {options.map((_, ArtifactNum) => {
          var childProps = {
            ArtifactNum: ArtifactNum,
            mainStats: options[ArtifactNum],
          };
          return renderOnView(
            views[ArtifactNum],
            <ArtifactField key={ArtifactNum} {...childProps} />
          );
        })}
        {renderOnView(setEffect, <SetEffectField />)}
      </div>
    </>
  );
};

export default ArtifactsView;
