import { Trunc } from "./Trunc.js";
var validate = (x, out) => (x > 0 && x < 91 ? out(x) : 0);
var ol = (x) =>
  Trunc(
    0.0000556 * Math.pow(x, 4) -
      0.0046801 * Math.pow(x, 3) +
      0.2997675 * Math.pow(x, 2) +
      1.0962838 * x +
      26.4887857
  );
var ec = (x) =>
  Trunc(
    0.0000265 * Math.pow(x, 4) -
      0.0016607 * Math.pow(x, 3) +
      0.1205241 * Math.pow(x, 2) +
      1.5494266 * x +
      14.6657471
  );
var sc = (x) =>
  Trunc(
    0.0008476 * Math.pow(x, 3) -
      0.0166807 * Math.pow(x, 2) +
      1.5968103 * x +
      3.2636734
  );
var s = (x) =>
  Trunc(
    0.0009943 * Math.pow(x, 3) -
      0.0187566 * Math.pow(x, 2) +
      1.9236568 * x +
      2.0633444
  );
var Overload = (x) => validate(x, ol);
var Electrocharge = (x) => validate(x, ec);
var Superconduct = (x) => validate(x, sc);
var Swirl = (x) => validate(x, s);

export { Overload, Electrocharge, Superconduct, Swirl };
