/*
 * Otter
 * =====
 *
 */

const MAX_SIZE = 1;
const MIN_SIZE = 0.1;
const MAX_INITIAL_SIZE = 0.4;
const GROWTH_FACTOR = 0.2;

export default class Otter extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'otter');

    this._game = game;

    this.anchor.set(0.5, 0.5);
    this._speed = 0.0015 + (0.001 * Math.random());
    this._size = MIN_SIZE + ((MAX_INITIAL_SIZE - MIN_SIZE) * Math.random());

    this._points = {
      x: [],
      y: [],
    };

    const numberOfPoints = 2 + Math.round(Math.random() * 8);
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
    this.body.setCircle(this.width/2, 0, 0);
    this._updateScale();
  }

  update() {
    const newX = Phaser.Math.bezierInterpolation(this._points.x, this._progress);
    const newY = Phaser.Math.bezierInterpolation(this._points.y, this._progress);

    this.rotation = (Math.PI / 2) + Phaser.Math.angleBetween(this.x, this.y, newX, newY);

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

  _updateScale() {
    this.scale.set(this._size, this._size);
    this.body.setCircle(this.width/2, 0, 0);
  }

  drink(source) {
    source.changeLevel(Math.pow((1 - MIN_SIZE) + this._size, 2));

    if (this._size < MAX_SIZE) {
      this._size += GROWTH_FACTOR;
      this._speed = this._speed / 1.1;

      this._game.add.tween(this.scale).to( { y: this._size, x: this._size }, 400, Phaser.Easing.Quadratic.Out, true);
      this.body.setCircle(this._size * this.texture.width/2, 0, this.texture.height / 3);
    }
  }
}
