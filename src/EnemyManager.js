const MAX_ENEMIES = 40;
const MIN_DELAY = 200;
const DELAY_DECREASE = 100;

import Otter from './objects/Otter';

export default class EnemyManager {

  constructor(state, sea) {
    this._state = state;
    this._sea = sea;
    this._spawnDelay = 2000;
    this._otters = this._state.add.group();
    this._otters.classType = Otter;
    this._otters.enableBody = true;
    this._otters.physicsBodyType = Phaser.Physics.ARCADE;

    this._state.registerBulletTarget(this._otters);
  }

  start() {
    this.setupNext();
    this._state.time.events.loop(2000, this.decreaseLevel, this);

  }

  setupNext() {
    this._state.time.events.add(this._spawnDelay, this.spawnEnemy, this);

    if (this._spawnDelay - DELAY_DECREASE >= MIN_DELAY) {
      this._spawnDelay -= DELAY_DECREASE;
    }
  }

  spawnEnemy() {
    if (this._otters.countLiving() < MAX_ENEMIES) {
      const otter = new Otter(this._state.game, 0, 0);
      this._otters.add(otter);
      otter.init(this);
    }
    this.setupNext();
  }

  decreaseLevel() {
    this._otters.forEachAlive((otter) => {
      if (this._sea.containsItem(otter)) {
        otter.drink(this._sea);
      }
    });
  }

  onEnemyKilled(enemy) {
    this._sea.changeLevel(-enemy.getAmountDrunk());
    this.removeEnemy(enemy);
  }

  removeEnemy(enemy) {
    this._otters.remove(enemy);
  }
}
