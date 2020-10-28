import React from "react";
import WeaponField from "./WeaponField.js";
import CharacterField from "./CharacterField.js";
import ArtifactsView from "./ArtifactsView.js";
import {
  WeaponFieldName,
  ArtifactFieldName,
  CharacterFieldName,
} from "./Names.js";
import { Button } from "./utils/Button.js";
const StatsView = "StatsView";
const BuffView = "BuffView";
const TalentView = "TalentView";
class CharacterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: StatsView };
  }

  setView = (view) => {
    this.setState({ view: view });
  };

  render = () => {
    var StatsViewRender = () => (
      <>
        <div className="section__mainBody--row">
          <CharacterField
            {...this.props[CharacterFieldName]}
            onChange={this.props.onChange(CharacterFieldName)}
          />
          <WeaponField
            {...this.props[WeaponFieldName]}
            onChange={this.props.onChange(WeaponFieldName)}
          />
        </div>
        <ArtifactsView
          data={this.props[ArtifactFieldName]}
          onChange={this.props.onChange(ArtifactFieldName)}
        />
      </>
    );
    return (
      <div className="section__mainBody">
        <div className="section__mainBody--row">
          <Button onClick={() => this.setView(StatsView)}>Stats</Button>
          <Button onClick={() => this.setView(BuffView)}>Buffs</Button>
          <Button onClick={() => this.setView(TalentView)}>Damage Calc</Button>
        </div>
        <div className="section__mainBody--column">
          {this.state.view.localeCompare(StatsView) === 0 ? (
            StatsViewRender()
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };
}

export default CharacterView;
