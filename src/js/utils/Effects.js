const effects = {
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
  Skill: "Ele. Skill DMG (%)",
  Burst: "Ele. Burst D.MG (%)",
  Total: "Total DMG (%)",
  ATKSPD: "Attack Speed (%)",
  CDR: "Cool Down (%)",
  MVSPD: "Movement Speed (%)",
  LVL: "LVL",
  Swirl: "Swirl DMG (%)",
  Overload: "Overload DMG (%)",
  Eletrocharge: "Eletrocharge DMG (%)",
  Superconduct: "Superconduct DMG (%)",
  Shattered: "Shattered DMG (%)",
  Melt: "Melt DMG (%)",
  Vaporize: "Vaporize DMG (%)",
  Crystalize: "Crystalize DMG (%)",
  None: "None",
};
const longestArtifactName = effects.er;
const generalSubs = [
  effects.cr,
  effects.cd,
  effects.er,
  effects.em,
  effects.PATK,
  effects.PDEF,
  effects.PHP,
];
const artifactMain = [effects.em, effects.PATK, effects.PHP, effects.PDEF];
const flowerMain = [effects.ART_HP];
const plumeMain = [effects.ART_ATK];
const sandsMain = [effects.er].concat(artifactMain);
const gobletMain = [effects.ele, effects.phys].concat(artifactMain);
const circletMain = [effects.cr, effects.cd, effects.healb].concat(artifactMain);
const weaponSub = [effects.None, effects.phys].concat(generalSubs);
const characterAscensionStat = [effects.None].concat(generalSubs);
const characterStats = [effects.LVL, effects.HP, effects.ATK, effects.DEF];
const weaponPassives = [
  effects.None,
  effects.ele,
  effects.phys,
  effects.Skill,
  effects.Burst,
  effects.Normal,
  effects.Charge,
  effects.Total,
  effects.MVSPD,
  effects.ATKSPD,
].concat(generalSubs);
const setEffectSubs = [
  effects.Swirl,
  effects.Overload,
  effects.Eletrocharge,
  effects.Superconduct,
  effects.Melt,
  effects.Vaporize,
]
const setEffects = [].concat(weaponPassives).concat(setEffectSubs);
const artifactSub = [
  effects.None,
  effects.ART_HP,
  effects.ART_ATK,
  effects.ART_DEF,
].concat(generalSubs);
const buffsList = Array.from(new Set(["None"].concat(artifactSub).concat(weaponPassives)))

export {
  effects,
  setEffects,
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
  buffsList,
};
