import React from 'react';
import {MessagesContainer, MessageStyled, UserStyled, TextStyled} from './styles/chatStyles';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  };

  render () {
    let hues = ['#d41111', '#11d452', '#3366ff', '#f47171'];
    return (
      <MessagesContainer>
          {this.props.messages.map((message, index) => {
            return (index === 0) ? <MessageStyled first={'first'} key={Math.random()}><UserStyled hue={hues[message.character]}>{message.user}</UserStyled> <TextStyled>{message.message}</TextStyled></MessageStyled>: <MessageStyled first={'notFirst'} key={Math.random()}><UserStyled hue={hues[message.character]}>{message.user}</UserStyled> <TextStyled>{message.message}</TextStyled></MessageStyled>
          })}
        </MessagesContainer>
    )
  };
};

export default React.memo(Messages);