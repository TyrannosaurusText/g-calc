import React from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import { avaliableFields } from "./Names.js";
import { Button } from "./utils/Button.js";
import DamageCalc from "./DamageField.js";
const StatsView = "Stats";
const BuffView = "Buff";
const DamageView = "Damage Calc";
const validViews = [StatsView, BuffView, DamageView];

// var LoadComponent = (Component, fieldName) => (
//   <Component {...props[fieldName]} onChange={props.onchange(fieldName)} />
// );

const StatsViewRender = (props) => (
  <>
    <div className="section__mainBody--row">
      <CharacterField {...props} />

      <WeaponField {...props} />
    </div>
    <ArtifactsView {...props} />
  </>
);
const BuffViewRender = (props) => <></>;
const DamageFieldNameRender = (props) => (
  <>
    <DamageCalc {...props} />
  </>
);
const Export = (props) => (
  <>
    <textarea>{avaliableFields.map((val) => props[val]).join(",")}</textarea>
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
