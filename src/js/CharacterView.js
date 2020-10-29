import React from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
  DamageFieldName,
} from "./Names.js";
import { Button } from "./utils/Button.js";
import DamageCalc from "./DamageCalc.js";

const StatsView = "Stats";
const BuffView = "Buff";
const DamageView = "Damage Calc";
const validViews = [StatsView, BuffView, DamageView];

// var LoadComponent = (Component, fieldName) => (
//   <Component {...props[fieldName]} onChange={props.onchange(fieldName)} />
// );
var StatsViewRender = (props) => (
  <>
    <div className="section__mainBody--row">
      <CharacterField
        {...props[CharacterFieldName]}
        onChange={props.onChange(CharacterFieldName)}
      />
      <WeaponField
        {...props[WeaponFieldName]}
        onChange={props.onChange(WeaponFieldName)}
      />
    </div>
    <ArtifactsView
      data={props[ArtifactFieldName]}
      onChange={props.onChange(ArtifactFieldName)}
    />
  </>
);
var BuffViewRender = (props) => (
  <>
    <div className="section__mainBody--row">
      <CharacterField
        {...props[CharacterFieldName]}
        onChange={props.onChange(CharacterFieldName)}
      />
      <WeaponField
        {...props[WeaponFieldName]}
        onChange={props.onChange(WeaponFieldName)}
      />
    </div>
    <ArtifactsView
      data={props[ArtifactFieldName]}
      onChange={props.onChange(ArtifactFieldName)}
    />
  </>
);
var DamageFieldNameRender = (props) => (
  <>
    <DamageCalc
      {...props[DamageFieldName]}
      onChange={props.onChange(DamageFieldName)}
    />
  </>
);
class CharacterView extends React.PureComponent {
  render = () => {
    const currentView = this.props.view || StatsView;
    var obj = {
      [StatsView]: StatsViewRender(this.props),
      [BuffView]: BuffViewRender(this.props),
      [DamageView]: DamageFieldNameRender(this.props),
    };
    return (
      <div className="section__mainBody">
        <div className="section__mainBody--row">
          {Object.keys(obj).map((view) => (
            <Button key={view} onClick={() => this.props.setView(view)}>
              {view}
            </Button>
          ))}
        </div>
        <div className="section__mainBody--column">
          {Object.keys(obj).map((view) =>
            currentView.localeCompare(view) === 0 ? (
              <div key={view}>{obj[view]}</div>
            ) : (
              <div key={view}></div>
            )
          )}
        </div>
      </div>
    );
  };
}

export default CharacterView;
