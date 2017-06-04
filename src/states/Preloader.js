/*
 * Preloader state
 * ===============
 *
 * Takes care of loading the main game assets, including graphics and sound
 * effects, while displaying a busy splash screen.
 */

import assets from '../assets';

export default class Preloader extends Phaser.State {

  preload() {
    this.showSplashScreen();
    this.load.pack('game', null, assets);
  }

  create(game) {
    // Here is a good place to initialize plugins dependent of any game asset.
    // Don't forget to `import` them first. Example:
    //this.game.myPlugin = this.plugins.add(MyPlugin/*, ... parameters ... */);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.state.start('MainMenu');
  }

  // --------------------------------------------------------------------------

  showSplashScreen() {
    this.load.setPreloadSprite(this.add.image(82, 282, 'progress-bar'));
  }

}
