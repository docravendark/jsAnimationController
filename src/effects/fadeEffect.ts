import { baseEffect } from "./baseEffect";

export class fadeEffect extends baseEffect {

  private _originalOpacity: number = 0;
  private _from: number = 0;
  private _to: number = 0;

  public constructor(to: number) {
    super();
    this._to = to;
  }

  public Start(): void {
    this._originalOpacity = this.SceneObject.Opacity;
    this._from = this.SceneObject.Opacity;
  }

  public Apply(fractionDone: number): void {
    this.SceneObject.Opacity = this.calculateIntermediaryNumber(this._from, this._to, fractionDone);
  }

  public Reset(): void {
    this.SceneObject.Opacity = this._originalOpacity;
  }
}