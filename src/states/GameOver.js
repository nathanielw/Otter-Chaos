/*
 * GameOver state
 * ==============
 *
 */

const messages = [
  'FANTAstic effort',
  'That was SODApressing to watch',
  'Orange you glad you played?',
  'Don\'t lose your fizz, try again!',
  'That was an otterly terrible effort',
];

const PADDING = 20;

export default class GameOver extends Phaser.State {

  create(game) {
    // TODO: make a function for adding text
    const style = { font: 'bold 60pt Londrina Solid', fill: '#ffb365', align: 'center', wordWrap: true, wordWrapWidth: game.world.width - (PADDING * 2) };
    const text = game.add.text(game.world.centerX, game.world.height  * 0.2, 'Game Over', style);
    text.lineSpacing = -20;
    text.anchor.set(0.5, 0);

    const smallStyle = { font: '30pt Londrina Solid', fill: '#6966aa', align: 'center', wordWrap: true, wordWrapWidth: game.world.width - (PADDING * 2) };
    const smallText = game.add.text(game.world.centerX, game.world.height * 0.95, 'Tap to restart', smallStyle);
    smallText.anchor.set(0.5, 1);

    const punMessage = messages[Math.floor(Math.random() * messages.length)];
    const punStyle = { font: '20pt Londrina Solid', fill: '#fabf83', align: 'center', wordWrap: true, wordWrapWidth: game.world.width - (PADDING * 2) };
    const punText = game.add.text(game.world.centerX, game.world.height * 0.65, punMessage, punStyle);
    punText.anchor.set(0.5, 0);

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
