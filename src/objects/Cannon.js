/*
 * Cannon
 * ======
 *
 */

import Bullet from './Bullet.js';

export default class Cannon extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'phaser');
    this._game = game;
    this._targets = [];

    this.anchor.set(0.5);
    this.width = 100; // TODO: remove
    this.height = 100; // TODO: remove

    this._maxBullets = 50;
    this._bulletSpacing = 350;
    this._bulletSpeed = 500;
    this._lastFired = -1;

    this.createBulletPool();
  }

  update() {
    this._game.physics.arcade.overlap(this._bulletPool, this._targets, (source, target) => {
      target.onHit();
      source.kill();
    });

    this.rotation = this._game.physics.arcade.angleToPointer(this) - (Math.PI * 1.5);

    if (this._game.input.activePointer.isDown) {
      this.fire();
    }
  }

  setTarget(x, y) {
    const o = this.x - x;
    const a = this.y - y;

    const angle = Math.atan(o/a) * 180 / Math.PI;
    this.angle = -angle;
  }

  createBulletPool() {
    this._bulletPool = this._game.add.group();
    this._bulletPool.classType = Bullet;
    this._bulletPool.enableBody = true;
    this._bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this._bulletPool.createMultiple(this._maxBullets, 'phaser');
    this._bulletPool.setAll('checkWorldBounds', true);
    this._bulletPool.setAll('outOfBoundsKill', true);
  }

  fire() {
    if (this._game.time.now >= this._lastFired + this._bulletSpacing && this._bulletPool.countDead() > 0) {
      this._lastFired = this._game.time.now;
      const bullet = this._bulletPool.getFirstDead();
      bullet.reset(this.x, this.y);
      this._game.physics.arcade.moveToPointer(bullet, this._bulletSpeed);
    }
  }

  registerBulletTarget(target) {
    this._targets.push(target);
  }
}