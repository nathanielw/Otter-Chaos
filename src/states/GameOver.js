/*
 * GameOver state
 * ==============
 *
 */

export default class GameOver extends Phaser.State {

  create(game) {
    const style = { font: 'bold 60pt Amethysta', fill: '#ffb365', align: 'center', wordWrap: true, wordWrapWidth: game.world.width };
    const text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', style);
    text.lineSpacing = -20;
    text.anchor.set(0.5);

    const smallStyle = { font: '30pt Amethysta', fill: '#ffb365', align: 'center', wordWrap: true, wordWrapWidth: game.world.width };
    const smallText = game.add.text(game.world.centerX, game.world.height * 0.9, 'Tap to restart', smallStyle);

    smallText.anchor.set(0.5, 1);

    const playButton = this.game.add.button(0, 0, '', () => {
      game.state.start('Game', true, false);
    }, this);

    playButton.width = game.world.width;
    playButton.height = game.world.height;
  }

  update() {
    // TODO: Stub
  }

}
