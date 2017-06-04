/*
 * `assets` module
 * ===============
 *
 * Declares static asset packs to be loaded using the `Phaser.Loader#pack`
 * method. Use this module to declare game assets.
 */

export default {
  // -- Splash screen assets used by the Preloader.
  boot: [{
    key: 'splash-screen',
    type: 'image'
  }, {
    key: 'progress-bar',
    type: 'image'
  }],

  // -- General assets used throughout the game.
  game: [
    {
      key: 'phaser',
      type: 'image'
    },
    {
      key: 'otter',
      type: 'image'
    },
    {
      key: 'sea',
      type: 'image'
    },
    {
      key: 'bubble',
      type: 'image'
    },
    {
      key: 'cannon',
      type: 'image'
    },
    {
      key: 'orange',
      type: 'image'
    },
    {
      key: 'bullet',
      type: 'image'
    }
  ]
};
