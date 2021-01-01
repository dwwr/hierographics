import styled from 'styled-components';

const StyledGame = styled.div`
  grid-column-start: span 1;
  grid-row: 2 / span 1;
  align-items: start;
  margin: 0px auto;
  transition: transform 1s ease-in;
  transform: ${props => props.open ? " translateY(-50%)" : null};
`;

export {StyledGame};