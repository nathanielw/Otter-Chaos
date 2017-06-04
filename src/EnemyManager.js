const MAX_ENEMIES = 40;
const BASE_WAVE_SIZE = 10;

import Otter from './objects/Otter';


export default class EnemyManager {

  constructor(state, sea) {
    this._state = state;
    this._sea = sea;
    this._waveDelay = 8000;
    this._waveDuration = 5000;
    this._round = 1;

    this._otters = this._state.add.group();
    this._otters.classType = Otter;
    this._otters.enableBody = true;
    this._otters.physicsBodyType = Phaser.Physics.ARCADE;

    this._state.registerBulletTarget(this._otters);
  }

  start() {
    this._state.time.events.add(this._waveDelay, this.startWave, this);
    this._state.time.events.loop(2000, this.decreaseLevel, this);
    this._state.time.events.loop(1500, this.spawnEnemy, this); // trickle
  }

  startWave() {
    this._state.time.events.add(this._waveDuration + this._waveDelay, this.startWave, this);

    const enemyCount = BASE_WAVE_SIZE + (this._round/4 * BASE_WAVE_SIZE);
    this._state.time.events.repeat(this._waveDuration / enemyCount, enemyCount, this.spawnEnemy, this);

    this._round++;
    this._waveDuration += 200;
  }

  spawnEnemy() {
    if (this._otters.countLiving() < MAX_ENEMIES) {
      const otter = new Otter(this._state.game, 0, 0);
      this._otters.add(otter);
      otter.init(this);
    }
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
