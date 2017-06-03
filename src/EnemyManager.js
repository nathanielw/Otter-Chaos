const MAX_ENEMIES = 40;
const MIN_DELAY = 200;
const DELAY_DECREASE = 100;

import Otter from './objects/Otter';

export default class EnemyManager {

  constructor(state) {
    this._state = state;
    this._spawnDelay = 2000;
    this._otters = this._state.add.group();
    this._otters.classType = Otter;
    this._otters.enableBody = true;
    this._otters.physicsBodyType = Phaser.Physics.ARCADE;

    this._state.registerBulletTarget(this._otters);
  }

  start() {
    this.setupNext();
  }

  setupNext() {
    this._state.time.events.add(this._spawnDelay, this.spawnEnemy, this);

    if (this._spawnDelay - DELAY_DECREASE >= MIN_DELAY) {
      this._spawnDelay -= DELAY_DECREASE;
    }
  }

  spawnEnemy() {
    if (this._otters.countLiving() < MAX_ENEMIES) {
      const otter = this._otters.create(Math.random() * this._state.world.width, 0, 'phaser');
      otter.init(this);
    }
    this.setupNext();
  }

  onEnemyKilled(enemy) {
    this.removeEnemy(enemy);
  }

  removeEnemy(enemy) {
    this._otters.remove(enemy);
  }
}
