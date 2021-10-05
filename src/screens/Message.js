import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { SmallButton } from '../components';
import { ScrollView, Dimensions } from 'react-native';
import {UrlContext, LoginContext, ProgressContext} from ".././contexts";
import SockJs from "sockjs-client";
import Stomp from 'stompjs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ChatEntireCon = styled.View`
  margin-bottom: ${HEIGHT*0.07};
  background-color: ${({ theme }) => theme.background};
`;

const InputContainer = styled.View`
  height: ${HEIGHT*0.07};
  bottom: 0;
  position: absolute;
  flex-direction: row;
`;

const ChatInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
    width: 80%;
    height: 95%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    border: 1px solid;
    padding: 10px; 0;
`;

const OtherchatContainer = styled.View`
  background-color: ${({ theme }) => theme.chatTextColor};
  margin-bottom: 5px;
  flex-direction: row;
  border: 0.8px solid;
  border-radius: 4px;
  padding: 3%;
  margin: 3%;
  margin-top: 1px;
  align-self: flex-start;
  max-width: 60%;
`;

const OwnchatContainer = styled.View`
  background-color: ${({ theme }) => theme.chatTextColor};
  margin-bottom: 5px;
  flex-direction: row;
  border: 0.8px solid;
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

const OtherEntireCon = styled.View`

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

const UserNameText = styled.Text`
  font-size: 14px;
  margin-left: 3%;
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
    <OtherEntireCon>
    <UserNameText>{route.params.name}</UserNameText>
      <ChatContainer>
        <OtherchatContainer>
          <ChatText>넵 안녕하세요</ChatText>
        </OtherchatContainer>
        <TimeContainer>
          <TimeText>2:45</TimeText>
        </TimeContainer>
      </ChatContainer>
      </OtherEntireCon>
  );
};


const Message = ({navigation, route}) => {

  const [messages, setMessages] = useState([]);
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const {curl} = useContext(UrlContext);
  const {token, mode, id} = useContext(LoginContext);
  const {spinner} = useContext(ProgressContext);

  const roomId = route.params.roomId;
  const sender = route.params.sender;
  
  let sock;
  let ws;

const connect = async() => {
    var data = {
      type:'ENTER',
      roomId: roomId,
      sender: sender,
      message: "",
    };

    ws.connect(
      {"token": token}, 
      () => {
        console.log("STOMP Connection");
    
        ws.subscribe("/chat/sub/room/"+roomId, (message) => {
        var content = JSON.parse(message.body);
        console.log("content:");
        console.log(content);
        });

        ws.send("/chat/pub/message", {"token": token}, JSON.stringify(data));
      },
      (error) => {
        alert("서버 연걸에 실패하였습니다. 다시 접속해주세요.");
      });
};

  useEffect(() => {
    sock = new SockJs(curl+"/chat/chatting");
    ws = Stomp.over(sock);
    connect();
    
    return () => {
      if(ws){
        ws.disconnect();
      }
    }
  }, []);
  

  const _handleMessageSend = () => {
      var newMessage = {
        type: "TALK",
        roomId: roomId,
        message: text,
        sender: sender,
      };

      ws.send("/chat/pub/message", {"token": token}, JSON.stringify(newMessage));
      setText("");
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{flex: 1}}
    extraHeight={20}>
    <Container>
      <ChatEntireCon>
      <ScrollView>
            <ChatContainer style = {true}>
              <TimeContainer>
                <TimeText>2:42</TimeText>
              </TimeContainer>
              <OwnchatContainer>
                <ChatText>안녕하세요</ChatText>
              </OwnchatContainer>
          </ChatContainer>

          <OtherEntireCon>
              <UserNameText>{route.params.name}</UserNameText>
                <ChatContainer>
                  <OtherchatContainer>
                    <ChatText>넵 안녕하세요</ChatText>
                  </OtherchatContainer>
                  <TimeContainer>
                    <TimeText>2:45</TimeText>
                  </TimeContainer>
                </ChatContainer>
          </OtherEntireCon>

          <ChatContainer style = {true}>
              <TimeContainer>
                <TimeText>2:42</TimeText>
              </TimeContainer>
              <OwnchatContainer>
                <ChatText>안녕하세요</ChatText>
              </OwnchatContainer>
          </ChatContainer>

          <OtherEntireCon>
              <UserNameText>{route.params.name}</UserNameText>
                <ChatContainer>
                  <OtherchatContainer>
                    <ChatText>넵 안녕하세요</ChatText>
                  </OtherchatContainer>
                  <TimeContainer>
                    <TimeText>2:45</TimeText>
                  </TimeContainer>
                </ChatContainer>
          </OtherEntireCon>

          <ChatContainer style = {true}>
              <TimeContainer>
                <TimeText>2:42</TimeText>
              </TimeContainer>
              <OwnchatContainer>
                <ChatText>안녕하세요</ChatText>
              </OwnchatContainer>
          </ChatContainer>

          <OtherEntireCon>
              <UserNameText>{route.params.name}</UserNameText>
                <ChatContainer>
                  <OtherchatContainer>
                    <ChatText>넵 안녕하세요</ChatText>
                  </OtherchatContainer>
                  <TimeContainer>
                    <TimeText>2:45</TimeText>
                  </TimeContainer>
                </ChatContainer>
          </OtherEntireCon>

          <ChatContainer style = {true}>
              <TimeContainer>
                <TimeText>2:42</TimeText>
              </TimeContainer>
              <OwnchatContainer>
                <ChatText>안녕하세요</ChatText>
              </OwnchatContainer>
          </ChatContainer>

          <OtherEntireCon>
              <UserNameText>{route.params.name}</UserNameText>
                <ChatContainer>
                  <OtherchatContainer>
                    <ChatText>넵 안녕하세요</ChatText>
                  </OtherchatContainer>
                  <TimeContainer>
                    <TimeText>2:45</TimeText>
                  </TimeContainer>
                </ChatContainer>
          </OtherEntireCon>

          <ChatContainer style = {true}>
              <TimeContainer>
                <TimeText>2:42</TimeText>
              </TimeContainer>
              <OwnchatContainer>
                <ChatText>안녕하세요</ChatText>
              </OwnchatContainer>
          </ChatContainer>

          <OtherEntireCon>
              <UserNameText>{route.params.name}</UserNameText>
                <ChatContainer>
                  <OtherchatContainer>
                    <ChatText>넵 안녕하세요</ChatText>
                  </OtherchatContainer>
                  <TimeContainer>
                    <TimeText>2:45</TimeText>
                  </TimeContainer>
                </ChatContainer>
          </OtherEntireCon>
      </ScrollView>
      </ChatEntireCon>
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
    </KeyboardAwareScrollView>
  );
};

export default Message;