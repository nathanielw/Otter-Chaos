/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Cannon from '../objects/Cannon';
import Sea from '../objects/Sea';
import EnemyManager from '../EnemyManager';

export default class Game extends Phaser.State {

  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#f5ecd4';

    const {centerX: x, height: y} = this.world;

    this._sea = new Sea(game, 0, this.world.height);
    this.add.existing(this._sea);
    this._sea.init();

    this._cannon = new Cannon(game, x, y);
    const enemyManager = new EnemyManager(this, this._sea);
    enemyManager.start();

    this.add.existing(this._cannon);
  }

  registerBulletTarget(target) {
    this._cannon.registerBulletTarget(target);
  }
}
