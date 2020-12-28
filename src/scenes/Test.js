import Phaser from 'phaser';
import Align from '../util/align.js';
import AlignGrid from '../util/alignGrid.js';
import io from 'socket.io-client';
// import socket from '../index';

class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'test'});

    // this.hero = null;
    // this.otherPlayers = null;
    // this.addPlayer = (playerInfo) => {
    //   console.log('called add player')
    //   this.hero = this.physics.add.sprite(100, 100,'hiero1')
    //   this.hero.scale = 1.5;
    //   this.hero.body.setAllowGravity(false);
    // }
    // this.addPlayer = this.addPlayer.bind(this);

    // this.addOtherPlayers = (playerInfo) => {
    //   const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'hiero2').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    //   otherPlayer.playerId = playerInfo.playerId;
    //   this.otherPlayers.add(otherPlayer);
    // }
    // this.addOtherPlayers = this.addOtherPlayers.bind(this)
  }

  preload () {
    this.load.crossOrigin = true;

    this.load.spritesheet('hiero1','/src/assets/hiero1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('hiero2','/src/assets/hiero2.png', { frameWidth: 32, frameHeight: 32 });
  }

  create () {

    // var self = this;
    // this.otherPlayers = this.physics.add.group();
    // this.socket = io('http://localhost:3001', { transports: ['websocket']});
    // console.log('socket', socket)
    // this.socket.on('currentPlayers', function (players) {
    //   console.log('connected');
    //   console.log(players)
    //   Object.keys(players).forEach(function (id) {
    //     if (players[id].userId === self.socket.id) {
    //       self.addPlayer(players[id]);
    //     } else {
    //       self.addOtherPlayers(players[id]);
    //     }
    //   });
    // });
    // this.socket.on('newPlayer', function (playerInfo) {
    //   self.addOtherPlayers(self, playerInfo);
    // });
    // this.socket.on('disconnect', function (playerId) {
    //   self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    //     if (playerId === otherPlayer.playerId) {
    //       otherPlayer.destroy();
    //     }
    //   });
    // });

    this.active = true;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.hero = this.physics.add.sprite(100, 100,'hiero1')
    this.hero.scale = 1.5;
    this.hero.body.setAllowGravity(false);

    this.anims.create(
      {
        key: 'run',
        frames: this.anims.generateFrameNumbers('hiero1', { start: 3, end: 12 }),
        frameRate: 10,
        repeat: -1
      }
    );


    this.grid = new AlignGrid({scene: this, rows: 5, cols: 5});
    this.grid.showNumbers();
    this.grid.placeAtIndex(11, this.hero);

  }

  update () {
    if (this.active) {
      if (this.cursors.right.isDown) {
        this.hero.flipX = false;
        this.hero.setVelocityX(100);
        this.hero.anims.play('run', true);
      } else if (this.cursors.left.isDown) {
        this.hero.flipX = true;
        this.hero.setVelocityX(-100);
        this.hero.anims.play('run', true);
      } else if (this.cursors.up.isDown) {
        this.hero.setVelocityY(-100);
        this.hero.anims.play('run', true);
      } else if (this.cursors.down.isDown) {
        this.hero.setVelocityY(100);
        this.hero.anims.play('run', true);
      }else {
        this.hero.setVelocityX(0);
        this.hero.setVelocityY(0);
        this.hero.anims.play('run', false);
      }
    }
  }
}

export default Test;