import React from 'react';
import {socket} from "./App";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      msg: "",
      messages: []
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onMessageSubmit = this. onMessageSubmit.bind(this);
  };

  onTextChange (e) {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit () {
    let message = this.state.msg;
    let user = this.props.user.username;
    console.log(this.props.user)
    let packet = {message, user}
    console.log(packet);
    socket.emit('newMessage', packet);
    this.setState({ msg: "" });
  };

  componentDidMount () {
    socket.on('messages', (messages) => {
      this.setState({messages})
    })
  }

  render () {
    return (
      <div>
        <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
        <button onClick={this.onMessageSubmit}>Send</button>
        <ul>
          {this.state.messages.map((message, index) => {
            return <li key={index}>{message.user} said {message.message}</li>
          })}
        </ul>
      </div>
    )
  };
};

export default Chat;