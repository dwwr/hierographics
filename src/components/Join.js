import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import {SpritesContainer, StyledSpritesheet, SelectedSpritesheet} from './styles/joinStyles';

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
      character: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    this.props.connectUser(this.state);
  }

  render() {
    return (
      <div>
        <label>username: </label>
        <input name="username" type="text" id="username" onChange={this.handleChange} value={this.state.username} required />
        <button onClick={this.submitForm}>Dive In</button>
        <SpritesContainer>
        {assets.map((sprite, index) => {
          if (index === this.state.character) {
            return <SelectedSpritesheet
            key={index}
            character={this.state.character}
            onClick={(event)=>{
              this.setState({character: index}, () => {
                console.log(this.state)
              });

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
          character={this.state.character}
          onClick={(event)=>{
            this.setState({character: index}, () => {
              console.log(this.state)
            });

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
      </div>
    )
  };
};

export default Form;