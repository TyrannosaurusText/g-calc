import React from "react";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import { useSelector } from "react-redux";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import "../css/TotalStats.css";
const TotalStats = () => {
  const props = useSelector(selectStats);
  const {
    totalHP,
    totalATK,
    totalDEF,
    totalCrit,
    totalCritDMG,
    totalATKSPD,
    totalRecharge,
    totalEM,
  } = props;

  const getVal = (stat) => {
    const val = props[stat] || 0;
    return val;
  };
  const totalAtkPercent = totalATK / (getVal(effects.ATK) || 1);
  const critDmgPercent =
    1 - totalCrit / 100 + (totalCrit / 100) * (1 + totalCritDMG / 100);

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
  const tableData = {
    "Total HP": (totalHP || 0).toFixed(2),
    "Total ATK": (totalATK || 0).toFixed(2),
    "Total DEF": (totalDEF || 0).toFixed(2),
    "Elemental Mastery": (totalEM || 0).toFixed(2),
    "Critical Rate": `${totalCrit}%`,
    "Critical Damage": `${totalCritDMG}%`,
    "Attack Speed": `${totalATKSPD}%`,
    "Energy Recharge": `${totalRecharge}%`,
    "": null,
    Multipliers: null,
    "ATK Multiplier": `${totalAtkPercent}x`,
    "CRIT Multiplier": `${critDmgPercent}x`,
  };
  return (
    <>
      <table className="table__table">
        <tbody>
          {Object.keys(tableData).map((rowName, index) => {
            return (
              <tr key={index}>
                <td className="table__td">{rowName}</td>
                <td className="table__td">{tableData[rowName]}</td>
              </tr>
            );
          })}

          <tr>
            <th className="table__th">Attack Type</th>
            <th className="table__th">Multiplier</th>
          </tr>
          {Object.keys(atkType).map((atkName) => (
            <tr key={atkName}>
              <td className="table__td">{atkName}</td>
              <td className="table__td">{atkType[atkName] / 100}x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TotalStats;
