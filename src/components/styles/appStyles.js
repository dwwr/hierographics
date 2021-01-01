import styled from 'styled-components';

const StyledApp = styled.div`
  width: 80%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 2fr;
  background-color: rgba(190, 132, 248, 0.904);
  border: 3px solid rgb(51, 102, 255);
  border-radius: 10px;
`;

const StyledFooter = styled.footer`
  width: 80%;
  height: 100%;
  margin: 10px auto;
  background-color: pink;
  color: rgb(51, 102, 255);
  font-family: "Optima";
  font-style: italic;
`;

export {StyledApp, StyledFooter};