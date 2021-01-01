import styled from 'styled-components';
import {css} from 'styled-components';

const ChatStyled = styled.div`
  transition: transform 1s ease-in;
  transform: ${props => props.open ? " translateY(-50%)" : null};
  margin: 0px auto;
  height: 607px;
  max-height: 607px;
  display: grid;
  justify-content: center;
  grid-column-start: 2 / span 1;
  grid-row: 2 / span 1;
  grid-template-columns: 9fr 1fr;
  grid-template-rows: 1fr 9fr;
  border-radius: 0px 10px 0px 0px;
  overflow-y: hidden;
`;

const InputStyled = styled.input`
  grid-column: 1 / span 1;
  grid-row: 1/ span 1;
  :focus {
    outline: none;
  }
  font-family: "Optima";
  font-style: italic;
  font-weight: bold;
`;

const ButtonStyled = styled.button`
  border: 0;
  padding: 5px;
  color: rgb(51, 102, 255);
  font-family: "Optima";
  font-style: italic;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px rgba(255, 128, 128, 0.719);
  grid-column: 2 / span 1;
  border-radius: 0px 10px 0px 0px;
  background-color: pink;
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

const MessagesContainer = styled.div`
  height: 537.3px;
  max-height: 537.3px;
  grid-column: 1 / span 2;
  grid-auto-flow: row;
  display: grid;
  overflow-y: auto;
  align-items: start;
  align-content: start;
`;

const MessageStyled = styled.div.attrs(props => ({
  className: props.first
}))`
  height: fit-content;
  background-color: #e6f2ff;
  margin-top: 5px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  :active {
    border: 3px solid #66b3ff;
  }
  &.first{
    @keyframes rolldown {
      0% {
        transform: translateY(-100px);
        border: 3px solid #ff4d4d;
      }
      100% {
        transform: translateY(0);
        border: 3px solid #ff4d4d;
      }
    }
    animation: .5s rolldown;
  }
`;

const UserStyled = styled.div`
  display: flex;
  font-family: "Optima";
  font-style: italic;
  font-size: 20px;
  font-weight: bold;
  flex-basis: 100%;
  color: ${props => props.hue };
`;

const TextStyled = styled.div`
  display: flex;
  font-family: "Optima";
  font-style: italic;
  font-size: 14px;
  flex-basis: 100%;
`;

export {ChatStyled, InputStyled, ButtonStyled,MessagesContainer, MessageStyled, UserStyled, TextStyled};