import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SmallButton } from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const InputContainer = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  position: absolute; 
  bottom: 0px; 
  height: 10%;
`;

const ChatInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
    width: 80%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid;
`;

const OtherchatContainer = styled.View`
  background-color: ${({ theme }) => theme.chatTextColor};
  margin-bottom: 5px;
  flex-direction: row;
  border: 0.5px solid;
  border-radius: 4px;
  padding: 3%;
  margin: 3%;
  align-self: flex-start;
  max-width: 60%;
`;

const OwnchatContainer = styled.View`
  background-color: ${({ theme }) => theme.chatTextColor};
  margin-bottom: 5px;
  flex-direction: row;
  border: 0.5px solid;
  border-radius: 4px;
  padding: 3%;
  margin: 3%;
  align-items: flex-end;
  justify-content: flex-end;
  align-self: flex-end;
  max-width: 60%;
`;

const ChatText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const ChatContainer  = styled.View`
  flex-direction: row;
  justify-content: ${({ style }) => style ? "flex-end" : "flex-start"};
`;

const TimeContainer  = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 3%;
`;

const TimeText = styled.Text`
  font-size: 14px;
  justify-content: flex-end;
  align-self: flex-end;
  
`;

const OwnChat = ({chat: {id, name, desc} }) => {
  return (
    <ChatContainer style = {true}>
      <TimeContainer>
        <TimeText>2:42</TimeText>
      </TimeContainer>
      <OwnchatContainer>
        <ChatText>안녕하세요</ChatText>
      </OwnchatContainer>
  </ChatContainer>
  );
};

const OtherChat = ({chat: {id, name, desc} }) => {
  return (
    <ChatContainer>
      <OtherchatContainer>
        <ChatText>넵 안녕하세요</ChatText>
      </OtherchatContainer>
      <TimeContainer>
        <TimeText>2:45</TimeText>
      </TimeContainer>
  </ChatContainer>
  );
};


const _handleMessageSend = () => {};

const Message = () => {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState();

  // 추후 데이터 받아오고 수정

  return (
    <Container>
      <ChatContainer style = {true}>
        <TimeContainer>
          <TimeText>2:42</TimeText>
        </TimeContainer>
        <OwnchatContainer>
          <ChatText>안녕하세요</ChatText>
        </OwnchatContainer>
      </ChatContainer>

      <ChatContainer>
        <OtherchatContainer>
          <ChatText>넵 안녕하세요</ChatText>
        </OtherchatContainer>
        <TimeContainer>
          <TimeText>2:45</TimeText>
        </TimeContainer>
      </ChatContainer>
      
      <InputContainer>
        <ChatInput
          value={text}
          onChangeText = { text => setText(text) }
          onSubmitEditing = {_handleMessageSend}
        />
        <SmallButton 
          title="전송"
          containerStyle={{ width: "20%",}}
          onPress={_handleMessageSend}
          />
      </InputContainer>
    </Container>
  );
};

export default Message;