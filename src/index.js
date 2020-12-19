import Phaser from 'phaser';

let config = {
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  width: 800,
  height: 600,
  backgroundColor: 'ff9999',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 1000},
          enableBody: true
      }
  },
  scene: []
};

let game = new Phaser.Game(config);

export  {game, config};