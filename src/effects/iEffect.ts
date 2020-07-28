
import { jsBaseAnimationObject } from "../types/jsBaseAnimationObject";

export interface iEffect {
  SceneObject: jsBaseAnimationObject;
  Start(): void;
  Apply(fractionDone: number): void;
  Stop(): void;
  Reset(): void;
}
