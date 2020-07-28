import { baseEffect } from "./baseEffect";
import { vector3 } from "../types/datatypes";

export class locationEffect extends baseEffect {

  private _originalLocation: vector3 = new vector3(0, 0, 0);

  public Start(): void {
    this._originalLocation = this.SceneObject.Location;
  }

  public Reset(): void {
    this.SceneObject.Location = this._originalLocation;
  }
}

