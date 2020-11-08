import { Trunc } from "./Trunc.js";
const lvlConstraint = (x, out) => (x > 0 && x < 91 ? out(x) : 0);
const ol = (x) =>
  Trunc(
    -0.0000029347 * Math.pow(x, 5) + 0.0005506720 * Math.pow(x, 4) - 0.0332158793 * Math.pow(x, 3) + 0.9775531392 * Math.pow(x, 2) - 4.2765576885 * x + 40.4647994435
  );
const shattered = (x) =>
  Trunc(
    -0.0000022838 * Math.pow(x, 5) + 0.0004328837 * Math.pow(x, 4) - 0.0266303723 * Math.pow(x, 3) + 0.7971700160 * Math.pow(x, 2) - 4.1553061404 * x + 34.6845277878
  );
const ec = (x) =>
  Trunc(
    -0.0000016456 * Math.pow(x, 5) + 0.0003056403 * Math.pow(x, 4) - 0.0180630927 * Math.pow(x, 3) + 0.5286068156 * Math.pow(x, 2) - 1.9083528517 * x + 23.1971984890
  );
const swirl = (x) =>
  Trunc(
    -0.0000007316 * Math.pow(x, 5) + 0.0001424157 * Math.pow(x, 4) - 0.0088061232 * Math.pow(x, 3) + 0.2730184420 * Math.pow(x, 2) - 1.2692979299 * x + 13.1641217855
  );
const sc = (x) =>
  Trunc(
    -0.0000006815 * Math.pow(x, 5) + 0.0001257728 * Math.pow(x, 4) - 0.0073286198 * Math.pow(x, 3) + 0.2100526539 * Math.pow(x, 2) - 0.5937899697 * x + 8.4614696213
  );
const rd = (x) =>
  Trunc(
    0.00000009 * Math.pow(x, 3) -
    0.0002767 * Math.pow(x, 2) +
    0.46647865 * x +
    0.19667643
  );
const vm = (x) =>
  Trunc(
    0.00000004 * Math.pow(x, 3) -
    0.00011561 * Math.pow(x, 2) +
    0.19487198 * x +
    0.07024967
  );
const c = (x) =>
  Trunc(
    0.00000006 * Math.pow(x, 3) -
    0.00018527 * Math.pow(x, 2) +
    0.3113969 * x +
    0.1159055
  );
const Overload = (x) => lvlConstraint(x, ol);
const Electrocharge = (x) => lvlConstraint(x, ec);
const Superconduct = (x) => lvlConstraint(x, sc);
const Swirl = (x) => lvlConstraint(x, swirl);
const Shattered = (x) => lvlConstraint(x, shattered);

const EMReactionDamage = (x) => rd(x);
const EMVaportizeMelt = (x) => vm(x);
const EMCrystalize = (x) => c(x);
const EMCalc = {
  EQA: x => EMReactionDamage(x),
  EQB: x => EMVaportizeMelt(x),
  EQC: x => EMCrystalize(x),
};
export { Overload, Electrocharge, Superconduct, Swirl, Shattered, EMCalc };








