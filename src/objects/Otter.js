/*
 * Otter
 * =====
 *
 */

export default class Otter extends Phaser.Sprite {

  constructor(game, ...args) {
    super(game, ...args);

    this.width = 60; // TODO: remove
    this.height = 60; // TODO: remove
    this.anchor.set(0.5, 0);

    this._speed = 0.002;

    this._points = {
      x: [],
      y: [],
    };

    const numberOfPoints = 2 + Math.round(Math.random() * 3);
    for (let i  = 0; i < numberOfPoints; i++) {
      let x = Math.random() * game.world.width;
      let y = i * ((game.world.height + (this.height * 2)) / (numberOfPoints - 1)) - this.height;
      this._points.x.push(x);
      this._points.y.push(y);
    }

    this._progress = 0;
  }

  init(enemyManager) {
    this._enemyManager = enemyManager;
  }

  update() {
    const newX = Phaser.Math.bezierInterpolation(this._points.x, this._progress);
    const newY = Phaser.Math.bezierInterpolation(this._points.y, this._progress);

    this.rotation = Phaser.Math.angleBetween(this.x, this.y, newX, newY);

    this.x = newX;
    this.y = newY;

    this._progress += this._speed;

    if (this._progress >= 1) {
      this._enemyManager.removeEnemy(this);
    }
  }

  onHit() {
    this._enemyManager.onEnemyKilled(this);
  }

}
