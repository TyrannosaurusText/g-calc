import React from "react";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import { useSelector } from "react-redux";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import { Trunc } from "./utils/Trunc.js";
import "../css/AttackTable.css";
const AttackTable = () => {
  const props = useSelector(selectStats);
  const getVal = (stat) => {
    const val = props[stat] || 0;
    return val;
  };
  const { totalATK, totalCrit, totalCritDMG } = props;
  const totalAtkPercent = Trunc((totalATK / (getVal(effects.ATK) || 1)) * 100);
  if (totalAtkPercent <= 0) return <></>;
  const normalAtkPercent = 1 - totalCrit / 100;
  const critDmgPercent =
    Trunc(normalAtkPercent + (totalCrit / 100) * (1 + totalCritDMG / 100)) *
    100;

  const sumEffects = (...effects) => {
    var sum = 0;
    for (const i in effects) {
      sum += getVal(effects[i]);
    }
    return sum;
  };
  const normalAttackPercent =
    100 + sumEffects(effects.Normal, effects.Total, effects.phys);
  const chargeAttackPercent =
    100 + sumEffects(effects.Charge, effects.Total, effects.phys);
  const eleNormal =
    100 + sumEffects(effects.Normal, effects.Total, effects.ele);
  const eleCharge =
    100 + sumEffects(effects.Charge, effects.Total, effects.ele);
  const Skill = 100 + sumEffects(effects.Skill, effects.Total, effects.phys);
  const Burst = 100 + sumEffects(effects.Burst, effects.Total, effects.phys);

  const atkType = {
    "P. Normal": normalAttackPercent,
    "P. Charge": chargeAttackPercent,
    "E. Normal": eleNormal,
    "E. Charge": eleCharge,
    "E. Skill": Skill,
    "E. Burst": Burst,
  };
  return (
    <>
      <table className="attackTable__table">
        <thead>
          <tr>
            {["Attack Type", "%ATK", "%CRIT", "%DMG"].map(colName => <th key={colName} className="attackTable__th">{colName}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.keys(atkType).map((atkName) => (
            <tr key={atkName}>
              <td className="attackTable__td">{atkName}</td>
              <td className="attackTable__td">{totalAtkPercent}%</td>
              <td className="attackTable__td">{critDmgPercent}%</td>
              <td className="attackTable__td">{atkType[atkName]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AttackTable;
