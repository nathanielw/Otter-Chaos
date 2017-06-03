/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';
import Cannon from '../objects/Cannon';

export default class Game extends Phaser.State {

  create(game) {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // TODO: Replace this with a really cool game code here :)
    const {centerX: x, centerY: y} = this.world;
    this.add.existing(new Logo(this.game, x, y));

    this.add.existing(new Cannon(this.game, x, y));
  }
}
