import React from 'react';
import {MessagesContainer, MessageStyled} from './styles/chatStyles';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  };

  render () {
    return (
      <MessagesContainer>
          {this.props.messages.map((message, index) => {
            return (index === 0) ? <MessageStyled first={'first'} key={Math.random()}>{message.user} said {message.message} </MessageStyled> : <MessageStyled first={'notFirst'} key={Math.random()}>{message.user} said {message.message}</MessageStyled>
          })}
        </MessagesContainer>
    )
  }
}

export default React.memo(Messages);