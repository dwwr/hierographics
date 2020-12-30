import React from 'react';
import Join from './Join';
import {Game} from './Game';
import Chat from './Chat';
import io from 'socket.io-client';
import Socket from '../Socket';
// let socket = new Socket('http://localhost:3001');
let socket = io('http://localhost:3001', { transports: ['websocket']});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      otherUsers: {},
      messages: []
    };
    this.socket = socket;
    this.connectUser = this.connectUser.bind(this);

  };

  connectUser(newUser) {
    socket.emit('newUser', newUser);

    socket.on('newSuccess', (newUser)=> {
      this.setState({user:newUser});
    })

  }

  componentDidMount () {
    socket.on('currentUsers', (success) => {
      let users = Object.values(success);
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId === this.state.user.userId) {
          delete users[i];
        }
      }
      this.setState({otherUsers:users})
    });
    socket.on('messages', (messages) => {
        this.setState({messages})
    })
  }


  render () {
    return (
      <div> Hello World
        <Join connectUser={this.connectUser}/>
        <Game user={this.state.user} otherUsers={this.state.otherUsers}/>
        <Chat messages={this.state.messages} user={this.state.user} />
      </div>
    )
  };
};

export {App, socket};