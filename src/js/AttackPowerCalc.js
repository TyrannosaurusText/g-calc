import React from "react";
import { Button } from "./utils/Button.js";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import {
  Overload,
  Electrocharge,
  Superconduct,
  Swirl,
} from "./utils/ReactionLevelDMG.js";
import { Trunc } from "./utils/Trunc.js";
class AttackPowerCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayAttack: true };
  }
  render = () => {
    var getVal = (stat) => {
      var val = this.props[stat] || 0;
      return val;
    };
    var { totalATK, totalCrit, totalCritDMG, EQA, EQB, EQC } = this.props;
    var totalAtkPercent = Trunc((totalATK / (getVal(effects.ATK) || 1)) * 100);
    if (totalAtkPercent <= 0) return <></>;
    var normalAtkPercent = 1 - totalCrit / 100;
    var critDmgPercent =
      Trunc(normalAtkPercent + (totalCrit / 100) * (1 + totalCritDMG / 100)) *
      100;

    var sumEffects = (...effects) => {
      var sum = 0;
      for (var i in effects) {
        sum += getVal(effects[i]);
      }
      return sum;
    };
    var normalAttackPercent =
      100 + sumEffects(effects.Normal, effects.Total, effects.phys);
    var chargeAttackPercent =
      100 + sumEffects(effects.Charge, effects.Total, effects.phys);
    var eleNormal =
      100 + sumEffects(effects.Normal, effects.Total, effects.ele);
    var eleCharge =
      100 + sumEffects(effects.Charge, effects.Total, effects.ele);
    var Skill = 100 + sumEffects(effects.Skill, effects.Total, effects.phys);
    var Burst = 100 + sumEffects(effects.Burst, effects.Total, effects.phys);

    var calcRatio = (attackType) => {
      return (
        <>
          {1}:{Math.round((critDmgPercent / totalAtkPercent) * 100) / 100}:
          {Math.round((attackType / totalAtkPercent) * 100) / 100}
        </>
      );
    };
    var calcValue = (attackType) => {
      return <>{Trunc((totalATK * critDmgPercent * attackType) / 10000)}</>;
    };
    var AtkType = {
      "Phys. Normal": normalAttackPercent,
      "Phys. Charge": chargeAttackPercent,
      "Ele. Normal": eleNormal,
      "Ele. Charge": eleCharge,
      "Ele. Skill": Skill,
      "Ele. Burst": Burst,
    };
    var charLevel = this.props[effects.LVL] || 0;

    var reactions = {
      "Swirl Dmg": Trunc(Swirl(charLevel) * (1 + EQA / 100)),
      "Overload Dmg": Trunc(Overload(charLevel) * (1 + EQA / 100)),
      "Electrocharge Dmg": Trunc(Electrocharge(charLevel) * (1 + EQA / 100)),
      "Superconduct Dmg": Trunc(Superconduct(charLevel) * (1 + EQA / 100)),
      "Pyro Melt / Hydro Vaporize": `${Trunc(2 * (1 + EQB / 100))}x`,
      "Cryo Melt / Pyro Vaporize": `${Trunc(1.5 * (1 + EQB / 100))}x`,
      Crystalize: EQC,
    };

    return (
      <>
        <div>
          Attack{" "}
          <Button
            onClick={() => {
              this.setState({ displayAttack: !this.state.displayAttack });
            }}
          >
            {this.state.displayAttack ? "Power" : "Ratio"}
          </Button>
          {this.state.displayAttack ? (
            <div>
              {Object.keys(AtkType).map((key) => (
                <div key={key} className="text__Ratio-space-even">
                  <div>{key}:</div>
                  <div>{calcValue(AtkType[key])}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {Object.keys(AtkType).map((key) => (
                <div key={key} className="text__Ratio-space-even">
                  <div>{key}:</div>
                  <div>{calcRatio(AtkType[key])}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {Object.keys(reactions).map((reaction) => {
          return (
            <div key={reaction}>
              {reaction}: {reactions[reaction]}{" "}
            </div>
          );
        })}
      </>
    );
  };
}

export default AttackPowerCalc;
