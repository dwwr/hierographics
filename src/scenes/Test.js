import Phaser from 'phaser';
import Align from '../util/align.js';
import AlignGrid from '../util/alignGrid.js';
import io from 'socket.io-client';
import {socket} from '../components/App';

class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'test'});
    this.user = {
      username: null
    }

    this.selectCharacter = (user) => {
      const characters = ['hiero1', 'hiero2', 'hiero3', 'hiero4'];
      return characters[user.character];
    }
  }

  preload () {
    this.load.crossOrigin = true;

    this.load.spritesheet('hiero1','/src/assets/hiero1.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero2','/src/assets/hiero2.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero3','/src/assets/hiero3.png', { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet('hiero4','/src/assets/hiero4.png', { frameWidth: 32, frameHeight: 33 });
  }

  create () {
    this.nameTags = {};
    this.existingUsers = {};

    socket.on('newSuccess', (user) => {
      console.log(user)
      this.user = user;
      let character = this.selectCharacter(user);
      console.log(character);
      this.hero = this.physics.add.sprite(100, 100,character)
      this.hero.scale = 1.5;
      this.hero.body.setAllowGravity(false);
      this.active = true;
      if (!this.nameTags[user.userId]) {
        const nameTag = this.add.text(100, 100, `${user.username}`, { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '25px', fill:'#3366ff'});
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
          let otherUser = this.add.sprite(100, 100, character);
          otherUser.scale = 1.5;
          otherUser.userId = user.userId;
          this.otherUsers.add(otherUser);
          this.existingUsers[user.userId] = user;
          if (!this.nameTags[user.userId] && user.username) {
            const nameTag = this.add.text(100, 100, `${user.username}`, { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '25px', fill:'#3366ff'});
            this.nameTags[user.userId] = nameTag;
          }
          this.anims.create(
            {
              key: 'run2',
              frames: this.anims.generateFrameNumbers(character, { start: 3, end: 12 }),
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
          this.nameTags[otherPlayer.userId].x = playerInfo.x;
          this.nameTags[otherPlayer.userId].y = playerInfo.y;
          otherPlayer.anims.play('run2', true);
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
    })

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


    this.grid = new AlignGrid({scene: this, rows: 5, cols: 5});
    this.grid.showNumbers();

  }

  update () {
    if (this.active) {

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
      this.nameTags[this.user.userId].x = this.hero.x;
      this.nameTags[this.user.userId].y = this.hero.y;


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
  }
}

export default Test;