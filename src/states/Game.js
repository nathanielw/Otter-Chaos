/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Cannon from '../objects/Cannon';
import EnemyManager from '../EnemyManager';

export default class Game extends Phaser.State {

  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#df8a26';

    const {centerX: x, height: y} = this.world;
    this._cannon = new Cannon(game, x, y);

    const enemyManager = new EnemyManager(this);
    enemyManager.start();

    this.add.existing(this._cannon);
  }

  registerBulletTarget(target) {
    this._cannon.registerBulletTarget(target);
  }
}
