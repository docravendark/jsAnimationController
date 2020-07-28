import { vector3 } from '../types/datatypes';
import { baseEffect } from "./baseEffect";

export class BaseRotationEffect extends baseEffect {

  private _originalRotation: vector3 = new vector3(0, 0, 0);

  public Start(): void {
    this._originalRotation = this.SceneObject.Rotation;
  }

  public Reset(): void {
    this.SceneObject.Location = this._originalRotation;
  }
}
