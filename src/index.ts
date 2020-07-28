import { jsAnimation } from "./jsAnimation";
import { moveEffect } from "./effects/moveEffect";
import { fadeEffect } from "./effects/fadeEffect";
import { rotationEffect } from './effects/rotationEffect';

declare global {
  interface Window { symolo: any; }
}

window.symolo = window.symolo || {};
window.symolo.jsAnimation = window.symolo.jsAnimation || jsAnimation;

window.symolo.effects = window.symolo.effects || {};
window.symolo.effects.moveEffect = window.symolo.effects.moveEffect || moveEffect;
window.symolo.effects.fadeEffect = window.symolo.effects.fadeEffect || fadeEffect;
window.symolo.effects.rotationEffect = window.symolo.effects.rotationEffect || rotationEffect;