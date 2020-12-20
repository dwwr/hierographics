import React from 'react';
import Join from './Join';
import Game from './Game';
import Chat from './Chat';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render () {
    return (
      <div> Hello World
        <Join />
        <Game />
        <Chat />
      </div>
    )
  };
};

export default App;