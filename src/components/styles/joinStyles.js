import styled from 'styled-components';
import Spritesheet from 'react-responsive-spritesheet';

const JoinStyled = styled.div.attrs(props => ({
  className: props.visibility
}))`
  display: inline-grid;
  grid-column-start: span 2;
  grid-row: 1 / span 1;
  height: 280px;
  width: 100%;
  margin: 0px auto;
  grid-template-columns: 85% 15%;
  grid-template-rows: 75% 25%;
  transition: transform 1s ease-in;
  transform: ${props => props.visibility === 'hide' ? " translateY(-110%)" : null};
  .hide{
    height: 0px;
  }
`;
const InputStyled = styled.input`
  font-family: "Optima";
  font-style: italic;
  font-weight: bold;
  :focus {
    outline: none;
  }
`;
const ButtonStyled = styled.button`
  color: rgb(51, 102, 255);
  font-family: "Optima";
  font-style: italic;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px rgba(255, 128, 128, 0.719);
  border: 0;
  padding: 0;
  border-radius: 0px 10px 0px 0px;
  background-color: pink;
  grid-row-start: 1;
  grid-row-end: 3;
  :hover {
    text-shadow: none;
    color: red;
    background-color: 	rgba(255, 128, 128, 0.719);
    transition: background-color, color, text-shadow, .75s ease .01s;
  }
  :active {
    color: #66b3ff;
    background-color: 	#ff4d4d;
    transition: background-color .1s ease-in 0s;
  }
  :focus {
    outline: none;
  }
`;
const SpritesContainer = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  align-self: center;
  justify-self: center;
  width: 80%;
  height: 80%;
  display: flex;
  -webkit-transform: perspective(900px);
  -webkit-transform-style: preserve-3d;
`;

const StyledSpritesheet = styled(Spritesheet)`
  padding: 10px auto;
  margin: 10px auto;
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition:.6s;
  position: relative;
  top: -25%;
  transform: rotatex(75deg) translatey(-350px) translatez(-75px);
  :hover{
    transform: rotatex(0deg);
    transform: rotatez(0deg);
    transform: translatey(-25%)
    transition:.6s;
  }
  :active{
    transform: rotatex(0deg);
    transform: rotatez(0deg);
    transition:.6s;
  }
`;

const SelectedSpritesheet = styled(Spritesheet)`
  margin: 21px auto;
  width: 100%;
  height: 100%;
  transform: rotatex(0deg);
  transform: rotatez(0deg);
  transform: translatey(-45px);
  border-width: 3px;
  border-style: solid;
  border-image:
    linear-gradient(
      to bottom,
      rgb(51, 102, 255),
      rgba(0, 0, 0, 0)
    ) 2 100%;
`;

export {JoinStyled, InputStyled, ButtonStyled, SpritesContainer, StyledSpritesheet, SelectedSpritesheet};