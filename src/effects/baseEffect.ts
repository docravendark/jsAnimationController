import { iEffect } from "./iEffect";
import { jsBaseAnimationObject } from "../types/jsBaseAnimationObject";
import { vector3, point, size, rect } from "../types/datatypes";

export class baseEffect implements iEffect {

  private _sceneObject: jsBaseAnimationObject;
  get SceneObject(): jsBaseAnimationObject {
    return this._sceneObject;
  }
  set SceneObject(value: jsBaseAnimationObject) {
    this._sceneObject = value;
  }

  constructor() {

  }

  public Start(): void { }
  Apply(fractionDone: number): void { }
  Stop(): void { }
  Reset(): void { }

  protected calculateIntermediaryVector(from: vector3, to: vector3, fractionDone: number): vector3 {
    return new vector3(
      this.calculateIntermediaryNumber(from.X, to.X, fractionDone),
      this.calculateIntermediaryNumber(from.Y, to.Y, fractionDone),
      this.calculateIntermediaryNumber(from.Z, to.Z, fractionDone)
    );
  }

  protected CalculateIntermediaryRect(from: rect, to: rect, fractionDone: number): rect {
    if (fractionDone >= 1.0)
      return to;

    if (fractionDone <= 0.0)
      return from;

    return new rect(
      this.calculateIntermediaryNumber(from.X, to.X, fractionDone),
      this.calculateIntermediaryNumber(from.Y, to.Y, fractionDone),
      this.calculateIntermediaryNumber(from.W, to.H, fractionDone),
      this.calculateIntermediaryNumber(from.W, to.H, fractionDone));
  }

  protected calculateIntermediaryPoint(from: point, to: point, fractionDone: number): point {
    return new point(
      this.calculateIntermediaryNumber(from.X, to.X, fractionDone),
      this.calculateIntermediaryNumber(from.Y, to.Y, fractionDone));
  }

  protected CalculateIntermediarySize(from: size, to: size, fractionDone: number): size {
    return new size(
      this.calculateIntermediaryNumber(from.W, to.W, fractionDone),
      this.calculateIntermediaryNumber(from.H, to.H, fractionDone));
  }

  protected CalculateIntermediaryChar(from: string, to: string, fractionDone: number): string {
    let intermediary: number = this.calculateIntermediaryNumber(from.charCodeAt(0), to.charCodeAt(0), fractionDone);
    return String.fromCharCode(intermediary);
  }

  protected calculateIntermediaryNumber(from: number, to: number, fractionDone: number): number {
    if (fractionDone >= 1.0)
      return to;

    if (fractionDone <= 0.0)
      return from;

    return (from + ((to - from) * fractionDone));
  }

  // protected Color CalculateIntermediaryColor(Color from, Color to, double fractionDone) {
  //   if (fractionDone >= 1.0f)
  //   return to;

  //   if (fractionDone <= 0.0f)
  //   return from;

  //   // There are a couple of different strategies we could use here:
  //   // - Calc intermediary individual RGB components - fastest
  //   // - Calc intermediary HSB components - nicest results, but slower

  //   //Color c = Color.FromArgb(
  //   //    this.CalculateIntermediary(from.R, to.R, fractionDone),
  //   //    this.CalculateIntermediary(from.G, to.G, fractionDone),
  //   //    this.CalculateIntermediary(from.B, to.B, fractionDone)
  //   //);
  //   Color c = FromHSB(
  //     this.CalculateIntermediary(from.GetHue(), to.GetHue(), fractionDone),
  //     this.CalculateIntermediary(from.GetSaturation(), to.GetSaturation(), fractionDone),
  //     this.CalculateIntermediary(from.GetBrightness(), to.GetBrightness(), fractionDone)
  //   );

  //   return Color.FromArgb(this.CalculateIntermediary(from.A, to.A, fractionDone), c);
  // }

  // /// <summary>
  // /// Convert a HSB tuple into a RGB color
  // /// </summary>
  // /// <param name="hue"></param>
  // /// <param name="saturation"></param>
  // /// <param name="brightness"></param>
  // /// <returns></returns>
  // /// <remarks>
  // /// Adapted from http://discuss.fogcreek.com/dotnetquestions/default.asp?cmd=show&ixPost=846
  // /// </remarks>
  // protected static Color FromHSB(float hue, float saturation, float brightness) {

  //   if (hue < 0 || hue > 360)
  //     throw "Value must be between 0 and 360 - hue";
  //   if (saturation < 0 || saturation > 100)
  //     throw "Value must be between 0 and 100 - saturation";
  //   if (brightness < 0 || brightness > 100)
  //     throw "Value must be between 0 and 100 - brightness";

  //   float h = hue;
  //   float s = saturation;
  //   float v = brightness;

  //   int i;
  //   float f, p, q, t;
  //   float r, g, b;

  //   if (saturation == 0) {
  //     // achromatic (grey)
  //     return Color.FromArgb((int)(v * 255), (int)(v * 255), (int)(v * 255));
  //   }
  //   h /= 60; // sector 0 to 5
  //   i = (int)Math.Floor(h);
  //   f = h - i;
  //   p = v * (1 - s);
  //   q = v * (1 - s * f);
  //   t = v * (1 - s * (1 - f));
  //   switch (i) {
  //     case 0:
  //       r = v;
  //       g = t;
  //       b = p;
  //       break;
  //     case 1:
  //       r = q;
  //       g = v;
  //       b = p;
  //       break;
  //     case 2:
  //       r = p;
  //       g = v;
  //       b = t;
  //       break;
  //     case 3:
  //       r = p;
  //       g = q;
  //       b = v;
  //       break;
  //     case 4:
  //       r = t;
  //       g = p;
  //       b = v;
  //       break;
  //     case 5:
  //     default:
  //       r = v;
  //       g = p;
  //       b = q;
  //       break;
  //   }
  //   return Color.FromArgb((int)(r * 255f), (int)(g * 255f), (int)(b * 255f));
  // }

  protected CalculateIntermediaryString(from: string, to: string, fractionDone: number): string {
    let length1 = from.length;
    let length2 = to.length;
    let length = Math.max(length1, length2);
    let result: Array<string> = new Array<string>(length);

    let complete: number = this.calculateIntermediaryNumber(0, length2, fractionDone);

    for (let i = 0; i < length; ++i) {
      if (i < complete) {
        if (i < length2)
          result[i] = to[i];
        else
          result[i] = ' ';
      }
      else {
        let fromChar: string = (i < length1) ? from[i] : 'a';
        let toChar: string = (i < length2) ? to[i] : 'a';

        if (toChar == ' ')
          result[i] = ' ';
        else {
          let mid = this.CalculateIntermediaryChar(fromChar, toChar, fractionDone).charCodeAt(0);
          // Unless we're finished, make sure that the same chars don't always map
          // to the same intermediate value.
          if (fractionDone < 1.0) mid -= i;
          let c = String.fromCharCode(mid);
          if (toChar == toChar.toUpperCase() && c == c.toLowerCase())
            c = c.toUpperCase();
          else
            if (toChar == toChar.toLowerCase() && c == c.toUpperCase())
              c = c.toLowerCase();
          result[i] = c;
        }
      }
    }

    return result.join("");
  }

}
