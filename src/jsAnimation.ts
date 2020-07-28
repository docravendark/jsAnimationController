import { effectControlBlock } from "./effects/effectControlBlock";
import { jsBaseAnimationObject } from "./types/jsBaseAnimationObject";
import { iEffect } from "./effects/iEffect";
import { jsAnimationEvents, startAnimationEventArgs, stopAnimationEventArgs } from "./events/jsAnimationEvents";
import { htmlAnimationObject } from "./types/htmlAnimationObject";

export enum jsAnimationBehave {
  None = 0,
  Loop,
  Bounce
}

export class jsAnimation {

  private _animationBlocks: Array<effectControlBlock>;
  private _currentRunningBlocks: Array<effectControlBlock>;
  private _isRunning: boolean = false;

  public Started: jsAnimationEvents<startAnimationEventArgs> = new jsAnimationEvents<startAnimationEventArgs>("Started");
  public Stopped: jsAnimationEvents<stopAnimationEventArgs> = new jsAnimationEvents<stopAnimationEventArgs>("Stopped");

  protected OnStarted(e: startAnimationEventArgs): void { this.Started.fire(this, e); }
  protected OnStopped(e: stopAnimationEventArgs): void { this.Stopped.fire(this, e); }

  get IsRunning(): boolean { return this._isRunning; }

  private _animationEndBehave: jsAnimationBehave = jsAnimationBehave.None;
  get AnimationEndBehave(): jsAnimationBehave { return this._animationEndBehave; }
  set AnimationEndBehave(value: jsAnimationBehave) { this._animationEndBehave = value; }

  constructor() {
    this._currentRunningBlocks = new Array<effectControlBlock>();
    this._animationBlocks = new Array<effectControlBlock>();
    this._animationEndBehave = jsAnimationBehave.None;
  }

  public Start(): void {
    for (let i = this._animationBlocks.length - 1; i >= 0; i--) {
      let cb: effectControlBlock = this._animationBlocks[i];
      cb.StartTick = new Date().getTime() + cb.ScheduledStartTick;
      cb.Stopped = false;
      this._currentRunningBlocks.push(cb);
    }
    this._isRunning = true;
    this.OnStarted(new startAnimationEventArgs());
  }

  public Stop(): void {
    this._isRunning = false;
    for (let i = this._currentRunningBlocks.length - 1; i >= 0; i--) {
      let cb: effectControlBlock = this._currentRunningBlocks[i];
      if (cb.Started && !cb.Stopped) {
        cb.Effect.Stop();
        cb.Stopped = true;
      }
    }

    this._currentRunningBlocks = new Array<effectControlBlock>();
    this.OnStopped(new stopAnimationEventArgs());
  }

  public registerSceneObject(obj: jsBaseAnimationObject | HTMLElement):jsBaseAnimationObject {
    let resultObj: jsBaseAnimationObject;

    if (obj instanceof HTMLElement) {
      resultObj = new htmlAnimationObject(obj);
    }
    else {
      resultObj = obj;
    }

    return(resultObj);
  }

  public add(objToSet: jsBaseAnimationObject, startTick: number, duration: number, effect: iEffect): void {
    if (this._isRunning)
      throw "Animation already running";
    let cb: effectControlBlock = new effectControlBlock(
      startTick,
      duration,
      effect
    );
    effect.SceneObject = objToSet;
    this._animationBlocks.push(cb);
  }

  public Reset(): void {
    for (let i = this._animationBlocks.length - 1; i >= 0; i--) {
      let cb: effectControlBlock = this._animationBlocks[i];
      cb.Effect.Reset();
      cb.Effect.SceneObject.OnRenderObject(this, null);
      cb.StartTick = 0;
      cb.Stopped = false;
    }
  }

  public Animate(elapsed?: number): void {

    if (!elapsed)
      elapsed = new Date().getTime();

    if (this._isRunning) {
      if (this._currentRunningBlocks.length > 0) {
        let Counter = 0;
        let current: effectControlBlock = this._currentRunningBlocks[Counter];
        while (current) {
          if (current.Stopped)
            this._currentRunningBlocks.splice(Counter, 1);
          else
            Counter++;
          if (Counter < this._currentRunningBlocks.length - 1)
            current = this._currentRunningBlocks[Counter];
          else
            break;
        }
      }
      else {
        // no effect -> done
        this.AnimationEnded();
      }

      for (let Counter = 0; Counter < this._currentRunningBlocks.length; Counter++) {
        let cb: effectControlBlock = this._currentRunningBlocks[Counter];

        if (cb.Stopped)
          continue;

        if (cb.StartTick <= elapsed) {
          if (!cb.Started) {
            cb.StartTick = elapsed;
            cb.Effect.Start();
            cb.Started = true;
          }
          if (cb.Duration > 0 && elapsed <= cb.ScheduledEndTick) {
            let fractionDone: number = (elapsed - cb.StartTick) / cb.Duration;
            cb.Effect.Apply(fractionDone);
            cb.Effect.SceneObject.OnRenderObject(this, null);
          }
          else {
            cb.Effect.Apply(1.0);
            cb.Effect.SceneObject.OnRenderObject(this, null);
            cb.Effect.Stop();
            cb.Stopped = true;
          }
        }
      }
    }
  }

  protected AnimationEnded(): void {
    switch (this.AnimationEndBehave) {
      case jsAnimationBehave.None:
        this.Stop();
        break;
      case jsAnimationBehave.Loop:
        this.Restart();
        break;
      case jsAnimationBehave.Bounce:
        break;
    }
  }

  protected Restart(): void {
    this.Stop();
    this.Reset();
    this.Start();
  }
}