import React from "react";
import { ArtifactFieldName } from "./Names";
import { effects } from "./utils/Effects.js";
class TotalStats extends React.Component {
  getStats = (props) => {
    const { WeaponField, ArtifactField, CharacterField } = props.data;
    if (null == WeaponField || null == ArtifactField || null == CharacterField)
      return null;
    var calcStat = (stat) => {
      var base = sumStats[stat] || 0;
      var percent = sumStats["%" + stat] / 100 || 0;
      var flat = sumStats["+" + stat];
      return base * (1 + percent) + flat;
    };
    var fetch = (stat) => {
      var val = sumStats[stat] || 0;
      return val;
    };
    var sumStats = {};
    var increment = (source, value) =>
      source ? source + (value || 0) : value || 0;
    console.log(props.data);
    var { ascensionStatType, ascensionStatValue, ...Char } = CharacterField;
    for (var key in Char) {
      sumStats[key] = increment(sumStats[key], Char[key]);
    }
    sumStats[ascensionStatType] = sumStats[ascensionStatValue];
    Array(5)
      .fill(0)
      .map((_, artifactIndex) => {
        var aTypes = `artifactTypes-${artifactIndex}`;
        var aVals = `artifactValues-${artifactIndex}`;
        var artifactType = ArtifactField[aTypes];
        var artifactValue = ArtifactField[aVals];
        Array(5)
          .fill(0)
          .map((_, lineNum) => {
            sumStats[artifactType[lineNum]] = increment(
              sumStats[artifactType[lineNum]],
              artifactValue[lineNum]
            );
          });
      });
    sumStats[WeaponField.weaponSubstatType] = increment(
      sumStats[WeaponField.weaponSubstatValue],
      WeaponField.weaponSubstatValue
    );
    var { weaponPassivesType, weaponPassivesValue } = WeaponField;
    for (var index = 0; index < weaponPassivesType.length; index++) {
      sumStats[weaponPassivesType[index]] = increment(
        sumStats[weaponPassivesType[index]],
        weaponPassivesValue[index]
      );
    }
    sumStats.totalHP = calcStat(effects.HP);
    sumStats.totalATK = calcStat(effects.ATK);
    sumStats.totalDEF = calcStat(effects.DEF);
    sumStats.totalCrit = 5 + fetch(effects.cr);
    sumStats.totalCritDMG = 50 + fetch(effects.cd);
    sumStats.totalATKSPD = 100 + fetch(effects.ATKSPD);
    sumStats.totalRecharge = 100 + fetch(effects.er);
    return sumStats;
  };

  render = () => {
    var allStats = this.getStats(this.props);
    if (null == allStats) return <div></div>;
    var displayStats = JSON.parse(JSON.stringify(allStats));

    var deleteStats = (stat) => {
      delete displayStats[stat];
      delete displayStats["%" + stat];
      delete displayStats["+" + stat];
    };

    deleteStats(effects.HP);
    deleteStats(effects.ATK);
    deleteStats(effects.DEF);
    var ElementalMastery = displayStats[effects.em];
    [
      "null",
      "None",
      effects.cr,
      effects.cd,
      effects.er,
      effects.ATKSPD,
      effects.er,
      effects.em,
    ].map((key) => delete displayStats[key]);
    var {
      totalHP,
      totalATK,
      totalDEF,
      totalCrit,
      totalCritDMG,
      totalATKSPD,
      totalRecharge,
      ...displayStats
    } = displayStats;

    console.log(displayStats);
    return (
      <div>
        <div> Total HP: {totalHP}</div>
        <div> Total ATK: {totalATK}</div>
        <div> Total DEF: {totalDEF}</div>
        <div>
          {effects.em}: {ElementalMastery}
        </div>
        <div> Critical Rate: {totalCrit}%</div>
        <div> Critical Damage: {totalCritDMG}%</div>
        <div> Attack Speed: {totalATKSPD}%</div>
        <div>
          {effects.er}: {totalRecharge}%
        </div>
        {Object.keys(displayStats).map((key, index) => (
          <div key={index}>
            {key}: {displayStats[key]}%
          </div>
        ))}
      </div>
    );
  };
}

export default TotalStats;
