import Phaser from "phaser";
import React from "react";
import Test from '../scenes/Test';
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
  backgroundColor: 'ff9999',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0},
          enableBody: true
      }
  },
  scene: [Test]
}

let game;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  componentDidMount() {
    game = new Phaser.Game(config);
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    console.log(this.props.open)
    return (
    <StyledGame id='phaser-game' open={this.props.open}></StyledGame>
    );
  }
};

export {Game, game, config}