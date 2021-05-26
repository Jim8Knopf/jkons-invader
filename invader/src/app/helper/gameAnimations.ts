import { getEnemyCorp, getPlayers, getShots } from './gameObjects';
import { gamepadChangeState } from './gameStates';

// * Vars
let animation: number;
let isAnimationActive: boolean = true;
let animationSpeed: number = 1 / 60;

// * Public Functions
/**
 * Updates all game animations.
 */
export function update(): void {
  setTimeout(() => {
    _updatePlayers();
    _updateShots();
    getEnemyCorp().updateEnemyCorp();
    if (isAnimationActive) {
      animation = requestAnimationFrame(update);
    }
  }, animationSpeed);
}

// * Setter
/**
 * Decide if the animation should be in active or inactive state.
 * @param state
 */
export function setAnimationState(state: boolean) {
  isAnimationActive = state;
}

// * Getter
/**
 * Get the animation to handle animation states.
 * @returns animation
 */
export function getAnimation(): number {
  return animation;
}

/**
 * Tells if the animation is active or inactive.
 * @returns isAnimationActive
 */
export function getAnimationState() {
  return isAnimationActive;
}

// * Private Functions
/**
 * Updates player animation.
 */
function _updatePlayers() {
  getPlayers().forEach((player) => {
    player.handleInput();
    player.handleGamepadInput();
  });
}

/**
 * Updates shot animation.
 */
function _updateShots() {
  getShots().forEach((shot) => {
    shot.animateShot();
  });
}
