var effects = {
  phys: "Phys. DMG (%)",
  ele: "Elemental DMG (%)",
  em: "Elemental Mastery",
  cr: "Crit Rate (%)",
  cd: "Crit DMG (%)",
  er: "Energy Recharge (%)",
  ATK: "ATK",
  ART_ATK: "+ATK",
  ART_HP: "+HP",
  ART_DEF: "+DEF",
  HP: "HP",
  DEF: "DEF",
  PATK: "%ATK",
  PDEF: "%DEF",
  PHP: "%HP",
  healb: "Healing Bonus (%)",
  Normal: "Normal Attack (%)",
  Charge: "Charge Attack (%)",
  Total: "Total Damage (%)",
  ATKSPD: "Attack Speed (%)",
  CDR: "Cool Down (%)",
  MVSPD: "Movement Speed (%)",
  None: "None",
};
var longestArtifactName = effects.er;
var generalSubs = [
  effects.cr,
  effects.cd,
  effects.er,
  effects.em,
  effects.PATK,
  effects.PDEF,
  effects.PHP,
];
var artifactMain = [effects.em, effects.PATK, effects.PHP, effects.PDEF];
var flowerMain = [effects.ART_HP];
var plumeMain = [effects.ART_ATK];
var sandsMain = [effects.er].concat(artifactMain);
var gobletMain = [effects.ele, effects.phys].concat(artifactMain);
var circletMain = [effects.cr, effects.cd, effects.healb].concat(artifactMain);
var weaponSub = [effects.None, effects.phys, effects.Normal, effects.Charge, effects.Total, effects.MVSPD].concat(generalSubs);
var characterAscensionStat = [].concat(generalSubs);
var characterStats = [effects.HP, effects.DEF, effects.ATK];
var weaponPassives = [effects.None, effects.ele, effects.phys].concat(
  generalSubs
);
var artifactSub = [
  effects.None,
  effects.ART_HP,
  effects.ART_DEF,
  effects.ART_ATK,
].concat(generalSubs);

export {
  effects,
  weaponSub,
  longestArtifactName,
  characterAscensionStat,
  characterStats,
  weaponPassives,
  artifactSub,
  flowerMain,
  plumeMain,
  sandsMain,
  gobletMain,
  circletMain,
};
