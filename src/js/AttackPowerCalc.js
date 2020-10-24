import React from "react";
import { Button } from "./utils/Button.js";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";

var Trunc = (value) => Math.trunc(value * 100) / 100;
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
    var { totalATK, totalCrit, totalCritDMG } = this.props;
    var totalAtkPercent = Trunc((totalATK / (getVal(effects.ATK) || 1)) * 100);
    if (totalAtkPercent <= 0) return;
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
    var LevelCalc = (x) => ({
      EQA: Trunc(
        0.0000556 * Math.pow(x, 4) -
          0.0046801 * Math.pow(x, 3) +
          0.2997675 * Math.pow(x, 2) +
          1.0962838 * x +
          26.4887857
      ),
      EQB: Trunc(
        0.0000265 * Math.pow(x, 4) -
          0.0016607 * Math.pow(x, 3) +
          0.1205241 * Math.pow(x, 2) +
          1.5494266 * x +
          14.6657471
      ),
      EQC: Trunc(
        0.0008476 * Math.pow(x, 3) -
          0.0166807 * Math.pow(x, 2) +
          1.5968103 * x +
          3.2636734
      ),
      EQD: Trunc(
        0.0009943 * Math.pow(x, 3) -
          0.0187566 * Math.pow(x, 2) +
          1.9236568 * x +
          2.0633444
      ),
    });
    
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
      </>
    );
  };
}

export default AttackPowerCalc;
