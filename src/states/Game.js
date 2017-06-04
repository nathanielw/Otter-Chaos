/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

const POWER_UP_MIN_DELAY = 500;
const POWER_UP_MAX_DELAY = 5000;
const MAX_POWER_UPS = 5;

import Cannon from '../objects/Cannon';
import Sea from '../objects/Sea';
import Orange from '../objects/Orange';
import EnemyManager from '../EnemyManager';

export default class Game extends Phaser.State {

  create(game) {
    game.stage.backgroundColor = '#f5ecd4';

    const {centerX: x, height: y} = this.world;

    this._sea = new Sea(game, 0, this.world.height);
    this.add.existing(this._sea);
    this._sea.init();

    this._cannon = new Cannon(game, x, y);
    const enemyManager = new EnemyManager(this, this._sea);
    enemyManager.start();

    this.add.existing(this._cannon);
    this.initPowerUps();
  }

  initPowerUps() {
    this._powerUps = this.add.group();
    this._powerUps.classType = Orange;
    this._powerUps.enableBody = true;
    this._powerUps.physicsBodyType = Phaser.Physics.ARCADE;
    this._powerUps.createMultiple(MAX_POWER_UPS, 'orange', this._sea);
    this._powerUps.setAll('checkWorldBounds', true);
    this._powerUps.setAll('outOfBoundsKill', true);

    this.registerBulletTarget(this._powerUps);

    this.time.events.add(POWER_UP_MIN_DELAY + ((POWER_UP_MAX_DELAY - POWER_UP_MIN_DELAY) * Math.random()), this.spawnPowerUp, this);
  }

  spawnPowerUp() {
    if (this._powerUps.countDead() > 0) {
      const powerUp = this._powerUps.getFirstDead();
      powerUp.reset(Math.random() * this.world.width, this.world.height);
      this.game.physics.arcade.moveToXY(powerUp, Math.random() * this.world.width, -100, 50 + (150 * Math.random()));
    }

    this.time.events.add(POWER_UP_MIN_DELAY + ((POWER_UP_MAX_DELAY - POWER_UP_MIN_DELAY) * Math.random()), this.spawnPowerUp, this);
  }

  registerBulletTarget(target) {
    this._cannon.registerBulletTarget(target);
  }
}
