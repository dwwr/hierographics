import Phaser from "phaser";
import React from "react";
import Lobby from '../scenes/Lobby';
import {StyledGame} from '../components/styles/gameStyles';

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
  backgroundColor: 'ffbf80',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0},
          enableBody: true
      }
  },
  scene: [Lobby]
}

let game;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  };

  componentDidMount() {
    game = new Phaser.Game(config);
  };

  render() {
    return (
    <StyledGame id='phaser-game' open={this.props.open}></StyledGame>
    );
  }
};

export {Game, game, config}