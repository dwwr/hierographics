import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import {JoinStyled, InputStyled, ButtonStyled, SpritesContainer, StyledSpritesheet, SelectedSpritesheet}from './styles/joinStyles';

let assets = [
  `../../src/assets/hiero1.png`,
  `../../src/assets/hiero2.png`,
  `../../src/assets/hiero3.png`,
  `../../src/assets/hiero4.png`
];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      character: -1,
      visible: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  submitForm(e) {
    e.preventDefault();
    if (!this.state.username || this.state.character === -1) {
      alert('Before entering, you must pick an avatar and username.');
      return;
    }
    let packet = {
      username: this.state.username,
      character: this.state.character
    };
    this.props.connectUser(this.state);
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    let visibility = "hide";

    if (this.state.visible) {
      visibility = "show";
    }

    return (
      <JoinStyled visibility={visibility}>
        <SpritesContainer>
        {assets.map((sprite, index) => {
          if (index === this.state.character) {
            return <SelectedSpritesheet
            key={index}
            visibility={visibility}
            character={this.state.character}
            onClick={(event)=>{
              this.setState({character: index});
            }}
            image={sprite}
            widthFrame={32}
            heightFrame={33}
            steps={13}
            fps={5}
            loop={true}
            startAt={0}
            endAt={5}
            />
          }
          return <StyledSpritesheet
          key={index}
          visibility={visibility}
          character={this.state.character}
          onClick={(event)=>{
            this.setState({character: index});
          }}
          image={sprite}
          widthFrame={32}
          heightFrame={33}
          steps={13}
          fps={5}
          loop={true}
          startAt={0}
          endAt={5}
        />
        })}
        </SpritesContainer>
        <InputStyled name="username" type="text" id="username" onChange={this.handleChange} value={this.state.username} required visibility={visibility} placeholder="Choose your Hiero, then tell me your name"/>
        <ButtonStyled visibility={visibility} onClick={this.submitForm}>Dive In</ButtonStyled>
      </JoinStyled>
    )
  };
};

export default Form;