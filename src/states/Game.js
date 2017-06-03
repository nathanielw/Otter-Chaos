/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Cannon from '../objects/Cannon';

export default class Game extends Phaser.State {

  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#df8a26';

    // TODO: Replace this with a really cool game code here :)
    const {centerX: x, height: y} = this.world;
    this.add.existing(new Cannon(this, x, y));
  }
}
