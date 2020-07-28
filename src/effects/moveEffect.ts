import { jsBaseAnimationObject } from "../types/jsBaseAnimationObject";
import { vector3 } from "../types/datatypes";
import { locationEffect } from "./locationEffect";

export class moveEffect extends locationEffect {

  private _from: vector3 = vector3.empty;
  private _to: vector3 = vector3.empty;

  public constructor(to: vector3) {
    super();
    this._to = to;
  }

  public Start(): void {
    super.Start();
    this._from = this.SceneObject.Location;
    this._to = this._from.add(this._to);
  }

  public Apply(fractionDone: number): void {
    this.SceneObject.Location = this.calculateIntermediaryVector(this._from, this._to, fractionDone);
  }
}