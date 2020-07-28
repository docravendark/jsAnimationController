import { vector3 } from "../types/datatypes";
import { BaseRotationEffect } from "./baseRotationEffect";

export class rotationEffect extends BaseRotationEffect {

  private _from: vector3 = new vector3(0,0,0);
  private _to: vector3  = new vector3(0,0,0);

  public constructor(to: vector3) {
    super();
    this._to = to;
  }

  public Start(): void {
    super.Start();
    this._from = this.SceneObject.Rotation;
    this._to = this._from.add(this._to);
  }

  public Apply(fractionDone: number): void {
    this.SceneObject.Rotation = this.calculateIntermediaryVector(this._from, this._to, fractionDone);
  }
}

