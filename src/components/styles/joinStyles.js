import styled from 'styled-components';
import Spritesheet from 'react-responsive-spritesheet';

const SpritesContainer = styled.div`
  minWidth: 64px;
  minHeight: 66px;
  display: flex;
  -webkit-transform: perspective(900px);
  -webkit-transform-style: preserve-3d;
`;

const StyledSpritesheet = styled(Spritesheet)`
  padding: 10px auto;
  margin: 10px auto;
  width: 96px;
  height: 99px;
  transition:.6s;
  border: 3px solid blue;
  transform: rotatex(75deg) translatey(-200px) translatez(-50px);
  :hover{
    transform: rotatex(0deg);
    transform: rotatez(0deg);
    transition:.6s;
  }
  :active{
    transform: rotatex(0deg);
    transform: rotatez(0deg);
    transition:.6s;
  }
`;

const SelectedSpritesheet = styled(Spritesheet)`
  margin: 10px auto;
  width: 96px;
  height: 99px;
  transition:.6s;
  transform: rotatex(0deg);
  transform: rotatez(0deg);
  transform: translatey(0px)
`;

export {SpritesContainer, StyledSpritesheet, SelectedSpritesheet}