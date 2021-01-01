import React from 'react';
import {socket} from "./App";
import {ChatStyled, InputStyled, ButtonStyled,MessagesContainer, MessageStyled} from './styles/chatStyles';
import Messages from './Messages'

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
    this.onKeyPress = this.onKeyPress.bind(this);

  };

  onTextChange (e) {
    e.preventDefault();
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit () {
    let message = this.state.msg;
    let user = this.props.user.username;
    console.log(this.props.user)
    let packet = {message, user}
    console.log(packet);
    if (this.props.user.username) {
      socket.emit('newMessage', packet);
      this.setState({ msg: "" });
    } else {
      alert('Please Log In!')
    }
  };

  onKeyPress (e) {
    if(e.which === 13) {
      this.onMessageSubmit();
    }
  }

  componentDidMount () {
    socket.on('messages', (messages) => {
      this.setState({messages})
    })
  }



  render () {
    return (
      <ChatStyled open={this.props.open}>
        <InputStyled onChange={e => this.onTextChange(e)} value={this.state.msg} onKeyPress={this.onKeyPress}/>
        <ButtonStyled onClick={this.onMessageSubmit}>Send</ButtonStyled>
        <Messages messages={this.state.messages} />
      </ChatStyled>
    )
  };
};

export default Chat;