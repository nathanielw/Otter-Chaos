/*
 * Sea
 * ===
 *
 */

const WAVE_HEIGHT = 75;
const WAVE_COLOR = 0xffb365;
export default class Sea extends Phaser.Graphics {

  constructor(game, x, y) {
    super(game, x, y, 'phaser');

    this._game = game;

    this.anchor.set(0, 1);
    this.width = game.world.width;
    this.height = game.world.height;
    this._level = this.y;
    this.makeWaves();
  }

  makeWaves() {
    this._waves = [];
    const waveCount = 4;
    const baseY = -this._game.world.height;
    for (let i = 0; i < waveCount; i++) {
      const y = baseY + Math.pow(i, 1.5) * 5;

      const wave = new Phaser.TileSprite(this._game, 0, y, this._game.world.width, 75, 'sea');
      wave.anchor.set(0, 0);
      wave.tilePosition.y = -1;
      wave.alpha = Math.pow((i + 1) * (1 / waveCount), 1.5);
      this._game.add.tween(wave).to( { y: y + 1 * Math.pow(i, 2) }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
      this.addChild(wave);
      this._waves.push(wave);
    }

    this.beginFill(WAVE_COLOR);
    this.drawRect(0, baseY + WAVE_HEIGHT, this._game.world.width, this._game.world.height);
    this.endFill();
  }

  update() {
    this._waves.forEach((wave, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      wave.tilePosition.x += (0.1 * (i+1)/2) * direction;
    });

    //this.height = this._level;
  }

  changeLevel(magnitude) {
    this._level += magnitude * 5;
    this._game.add.tween(this).to( { y: this._level }, 400, Phaser.Easing.Quadratic.Out, true);
  }

  containsItem(item) {
    return item.y > this._game.world.height - this.height;
  }
}
