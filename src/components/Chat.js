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
    // socket.receiveMessages('messages', (messages) => {
    //   this.setState({messages})
    // })
  };

  onTextChange (e) {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit () {
    socket.emit('newMessage', this.state.msg);
    this.setState({ msg: "" });
  };

  componentDidMount () {
    // socket.receiveMessages('messages', (messages) => {
    //   this.setState({messages})
    // })
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
            return <li key={index}>{message}</li>
          })}
        </ul>
      </div>
    )
  };
};

export default Chat;