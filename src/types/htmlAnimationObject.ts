import { jsBaseAnimationObject } from './jsBaseAnimationObject';

export class htmlAnimationObject extends jsBaseAnimationObject {

  private _originalObj: HTMLElement;

  private getTransformData(elToAnalyse : HTMLElement) {

    var st = window.getComputedStyle(elToAnalyse, null);

    var tr = st.getPropertyValue("-webkit-transform") ||
      st.getPropertyValue("-moz-transform") ||
      st.getPropertyValue("-ms-transform") ||
      st.getPropertyValue("-o-transform") ||
      st.getPropertyValue("transform") ||
      "fail...";

      console.log('TR: -' , tr);

    if(tr == "fail...") return 0;
    if(tr == "none") return 0;

    // With rotate(30deg)...
    // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    console.log('Matrix: -' , tr);

    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

    var values = tr.split('(')[1];
    values = values.split(')')[0];
    let splitValues = values.split(',');
    var a = Number(splitValues[0]);
    var b = Number(splitValues[1]);
    var c = Number(splitValues[2]);
    var d = Number(splitValues[3]);

    var scale = Math.sqrt(a * a + b * b);
    console.log('Scale: ' + scale);
    // arc sin, convert from radians to degrees, round
    // DO NOT USE: see update below
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    // works!
    console.log('Rotate: ' + angle + 'deg');

    return(angle);
  }

  constructor(obj: HTMLElement) {
    super();
    this._originalObj = obj;
    this.Opacity = Number(getComputedStyle(this._originalObj).getPropertyValue("opacity"));
    this.X = this._originalObj.offsetLeft;
    this.Y = this._originalObj.offsetTop;
    this.RotZ = this.getTransformData(this._originalObj);
  }

  public OnRenderObject(sender: any, e: any): void {
    this._originalObj.style.left = this.X + "px";
    this._originalObj.style.top = this.Y + "px";
    this._originalObj.style.opacity = this.Opacity.toString();
    this._originalObj.style.transform = 'rotateZ(' + this.RotZ + 'deg)';
  }
}