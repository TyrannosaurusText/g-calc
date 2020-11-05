import { effects } from "./Effects.js";
const initialDamageField = {
  TalentName: [],
  DamageType: [],
  ReactionMultipliers: [],
  DamageValue: [],
  monsterLevelStr: 0,
  monsterResStr: 0,
  resReduction: 0,
  defReduction: 0,
};
const initialBuffsField = {
  BuffName: [],
  BuffType: [],
  BuffValue: [],
  BuffToggle: [],
}
const initialCharacterField = {
  ascensionStatType: "None",
  ascensionStatValue: 0,
  HP: '',
  LVL: '',
  ATK: '',
  DEF: '',
};
const initialArtifactField = (() => {
  var obj = {};
  Array(5)
    .fill(0)
    .forEach((_, index) => {
      obj[`artifactTypes-${index}`] = Array(5).fill(null);
      obj[`artifactValues-${index}`] = Array(5).fill(0);
    });
  obj[`artifactTypes-0`][0] = effects.ART_HP;
  obj[`artifactTypes-1`][0] = effects.ART_ATK;
  obj[`artifactTypes-2`][0] = effects.er;
  obj[`artifactTypes-3`][0] = effects.ele;
  obj[`artifactTypes-4`][0] = effects.cr;
  obj[`artifactTypes-5`] = [];
  obj[`artifactValues-5`] = [];
  return obj;
})();
const initialWeaponField = {
  weaponSubstatType: "None",
  weaponPassivesType: [],
  weaponPassivesValue: [],
};

export default {
  initialWeaponField,
  initialDamageField,
  initialCharacterField,
  initialArtifactField,
  initialBuffsField,
};
