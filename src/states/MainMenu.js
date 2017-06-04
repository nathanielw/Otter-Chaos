/*
 * MainMenu state
 * ==============
 *
 */
 const PADDING = 20;

export default class MainMenu extends Phaser.State {

  create(game) {
    game.stage.backgroundColor = '#f5ecd4';

    // TODO: make a function for adding text
    const style = { font: 'normal 60pt Londrina Solid', fill: '#ffb365', align: 'center', wordWrap: true, wordWrapWidth: game.world.width - (PADDING * 2) };
    const text = game.add.text(game.world.centerX, game.world.height  * 0.1, 'Complete and Otter Chaos in a World of Fanta Seas', style);
    text.lineSpacing = -20;
    text.anchor.set(0.5, 0);

    const smallStyle = { font: '30pt Londrina Solid', fill: '#6966aa', align: 'center', wordWrap: true, wordWrapWidth: game.world.width - (PADDING * 2) };
    const smallText = game.add.text(game.world.centerX, game.world.height * 0.95, 'Tap to start', smallStyle);
    smallText.anchor.set(0.5, 1);

    const playButton = this.game.add.button(0, 0, '', () => {
      game.state.start('Game', true, false);
    }, this);

    playButton.width = game.world.width;
    playButton.height = game.world.height;
  }

}
