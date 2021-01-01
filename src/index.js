import Phaser from 'phaser';
import React from "react";
import ReactDOM from "react-dom";
import {App} from './components/App';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: pink;
  }
`;
ReactDOM.render(<div><GlobalStyle /><App /></div>, document.getElementById("root"));