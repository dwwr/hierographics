import Phaser from "phaser";
import React from "react";
import io from 'socket.io-client';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    let config = {
      type: Phaser.CANVAS,
      parent: 'phaser-game',
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
    }
    let game = new Phaser.Game(config);
    // let socket = io('http://localhost:3001');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
    <div id='phaser-game'> Hello BBJ </div>
    );
  }
};

export default Game;