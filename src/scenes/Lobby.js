import Phaser from 'phaser';
import Align from '../util/align.js';
import AlignGrid from '../util/alignGrid.js';
import {socket} from '../components/App';
import {game} from '../components/Game';

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'lobby'});
    this.user = {
      username: null
    }
    this.hero = {
      x: 0,
      y: 0
    }

    this.selectCharacter = (user) => {
      const characters = ['hiero1', 'hiero2', 'hiero3', 'hiero4'];
      return characters[user.character];
    }
  }

  preload () {
    this.load.crossOrigin = true;

    this.load.audio('theme', 'https://hierographics.s3-us-west-2.amazonaws.com/assets/notARealBar.mp3');
    this.load.spritesheet('hiero1','https://hierographics.s3-us-west-2.amazonaws.com/assets/hiero1.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero2','https://hierographics.s3-us-west-2.amazonaws.com/assets/hiero2.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero3','https://hierographics.s3-us-west-2.amazonaws.com/assets/hiero3.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero4','https://hierographics.s3-us-west-2.amazonaws.com/assets/hiero4.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('background', 'https://hierographics.s3-us-west-2.amazonaws.com/assets/background.png', { frameWidth: 400, frameHeight: 300 });

    this.title = this.add.text(400, 200, 'hieroGraphics', { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '100px', fill:'#3366ff'});
    this.title.setShadow(3, 3, '#809fff', 0);
    Align.centerH(this.title);
    this.title.depth = 2;

  }

  create () {
    let theme = this.sound.add('theme');
    theme.loop = true;
    theme.volume = 0.5;
    theme.play();

    this.background = this.add.sprite(0, 0,'background').setOrigin(0,0);
    this.anims.create(
      {
        key: 'loop',
        frames: this.anims.generateFrameNumbers('background', { start: 0, end: 90 }),
        frameRate: 30,
        repeat: -1
      }
    );
    this.background.anims.play('loop', true)
    this.background.scale = 2;
    this.background.opacity


    let hues = ['#d41111', '#11d452', '#3366ff', '#f47171'];
    this.nameTags = {};
    this.existingUsers = {};

    socket.on('newSuccess', (user) => {
      this.user = user;
      let character = this.selectCharacter(user);
      this.hero = this.physics.add.sprite(user.x, user.y, character)
      this.hero.scale = 1.5;
      this.hero.body.setAllowGravity(false);
      this.hero.body.collideWorldBounds = true;
      this.active = true;
      if (!this.nameTags[user.userId]) {
        const nameTag = this.add.text(user.x - 16, user.y - 50, `${user.username}`, { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '20px', fill:`${hues[user.character]}`});
        this.nameTags[user.userId] = nameTag;
      }

      this.anims.create(
        {
          key: 'run1',
          frames: this.anims.generateFrameNumbers(character, { start: 3, end: 12 }),
          frameRate: 10,
          repeat: -1
        }
      );
    })

    this.otherUsers = this.physics.add.group();

    socket.on('currentUsers', (users) => {
      users = Object.values(users);
      for (let user of users) {
        if (user.userId === this.user.userId) {
          continue;
        }
        if (user.username && !this.existingUsers[user.userId]) {
          let character = this.selectCharacter(user);
          let otherUser = this.add.sprite(user.x, user.y, character);
          otherUser.character = character;
          otherUser.scale = 1.5;
          otherUser.userId = user.userId;
          this.otherUsers.add(otherUser);
          this.existingUsers[user.userId] = user;
          if (!this.nameTags[user.userId] && user.username) {
            const nameTag = this.add.text(user.x - 16, user.y - 50, `${user.username}`, { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '20px', fill:`${hues[user.character]}`});
            this.nameTags[user.userId] = nameTag;
          }
          this.anims.create(
            {
              key: user.userId,
              frames: this.anims.generateFrameNumbers(otherUser.character, { start: 3, end: 12 }),
              frameRate: 10,
              repeat: -1
            }
          );
          otherUser = null;
        }
      }
    });

    socket.on('playerMoved', (playerInfo) => {
      this.otherUsers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.userId === otherPlayer.userId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          this.nameTags[otherPlayer.userId].x = playerInfo.x - 16;
          this.nameTags[otherPlayer.userId].y = playerInfo.y - 50;
          otherPlayer.anims.play(otherPlayer.userId, true);
          if (playerInfo.direction === "left") {
            otherPlayer.flipX = true;
          } else {
            otherPlayer.flipX = false;
          }
        }
      });
    });

    socket.on('playerStopped', (playerInfo) => {
      this.otherUsers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.anims.stop()
        }
      });
    });

    socket.on('disconnected', (playerId) => {
      this.otherUsers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.userId) {
          otherPlayer.destroy();
          this.nameTags[otherPlayer.userId].destroy();
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.removeCapture("SPACE");
    this.input.keyboard.removeCapture("ENTER");

  }

  update () {
    if (this.active) {
      this.background.alpha -= .01;
      this.title.y -= 10;

      let x = this.hero.x;
      let y = this.hero.y;
      let moving = false;

      if (this.hero.oldPosition && (x !== this.hero.oldPosition.x || y !== this.hero.oldPosition.y)) {
        socket.emit('playerMovement', { x: this.hero.x, y: this.hero.y, direction: this.hero.direction});
        moving = true;
      }

      this.hero.oldPosition = {
        x: this.hero.x,
        y: this.hero.y
      };

      if (this.nameTags[this.user.userId]) {
        this.nameTags[this.user.userId].x = this.hero.x - 16;
        this.nameTags[this.user.userId].y = this.hero.y - 50;
      }


      if (this.cursors.right.isDown) {
        this.hero.direction = "right";
        this.hero.flipX = false;
        this.hero.setVelocityX(100);
        this.hero.anims.play('run1', true);
      } else if (this.cursors.left.isDown) {
        this.hero.direction = "left";
        this.hero.flipX = true;
        this.hero.setVelocityX(-100);
        this.hero.anims.play('run1', true);
      } else if (this.cursors.up.isDown) {
        this.hero.setVelocityY(-100);
        this.hero.anims.play('run1', true);
      } else if (this.cursors.down.isDown) {
        this.hero.setVelocityY(100);
        this.hero.anims.play('run1', true);
      }else {
        this.hero.setVelocityX(0);
        this.hero.setVelocityY(0);
        this.hero.anims.play('run1', false);
        if (moving) {
          moving = false;
          socket.emit('playerStopment');
        }
      }
    }
  };
};

export default Lobby;