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
  const game = new Phaser.Game(440, 640, Phaser.CANVAS, '', {
    preload() {
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }
  });

  window.WebFontConfig = {
    active: function() {
      game.state.start('Boot');
    },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Amethysta']
    }
  };

  // Dynamically add all required game states.
  Object
    .entries(states)
    .forEach(([key, state]) => game.state.add(key, state));



  return game;
}
