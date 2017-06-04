/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

// Required: import Babel polyfills.
import 'babel-polyfill';

// Import game states.
import * as states from './states';

export function init() {
  console.log(window.innerHeight)
  const height = window.innerHeight;
  const width = height / 1.45;

  const game = new Phaser.Game(width, height, Phaser.CANVAS);

  // Dynamically add all required game states.
  Object
    .entries(states)
    .forEach(([key, state]) => game.state.add(key, state));

  game.state.start('Boot');

  return game;
}
