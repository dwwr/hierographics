import Phaser from 'phaser';
import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';

import io from 'socket.io-client';

let socket = io('http://localhost:3001', { transports: ['websocket']});

ReactDOM.render(<App />, document.getElementById("root"));