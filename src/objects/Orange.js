/*
 * Orange
 * ======
 *
 */

export default class Orange extends Phaser.Sprite {

  constructor(game, x, y, key, sea) {
    super(game, x, y, 'orange');
    this._sea = sea;
  }

  update() {
    // TODO: Stub.
  }

  onHit() {
    this._sea.changeLevel(-10);
    this.kill();
  }
}
