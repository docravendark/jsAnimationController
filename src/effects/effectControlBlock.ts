import { iEffect } from "./iEffect";

export class effectControlBlock {
  private _effect: iEffect;
  get Effect(): iEffect { return this._effect; }
  set Effect(value: iEffect) { this._effect = value; }

  private _scheduledStartTick: number = 0;
  get ScheduledStartTick(): number { return this._scheduledStartTick; }
  set ScheduledStartTick(value: number) { this._scheduledStartTick = value; }

  private _duration: number = 0;
  get Duration(): number { return this._duration; }
  set Duration(value: number) { this._duration = value; }

  private _started: boolean = false;
  get Started(): boolean { return this._started; }
  set Started(value: boolean) { this._started = value; }

  private _stopped: boolean = false;
  get Stopped(): boolean { return this._stopped; }
  set Stopped(value: boolean) { this._stopped = value; }

  private _startOffset: number = 0;
  get StartOffset(): number { return this._startOffset; }
  set StartOffset(value: number) { this._startOffset = value; }

  private _startTick: number = 0;
  get StartTick(): number { return this._startTick; }
  set StartTick(value: number) { this._startTick = value; }

  get ScheduledEndTick(): number { return this.StartTick + this.Duration; }

  public constructor(start: number, duration: number, effect: iEffect) {
    this._scheduledStartTick = start;
    this._duration = duration;
    this._effect = effect;
  }
}

