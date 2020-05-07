import React, { useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/macro';
import * as moment from 'moment';
import Spinner from './Spinner';

const StyledMessages = styled.div`
  grid-area: messages;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${props => props.theme.color.primary.dark.fullOpacity};
  border-right: none;
  &::-webkit-scrollbar {
    width: 20px;
    background: ${props => props.theme.color.primary.main.lowOpacity};
    border: 5px solid ${props => props.theme.color.primary.dark.fullOpacity};
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.color.primary.light.mediumOpacity};
    background-clip: padding-box;
    border: 5px solid rgba(0, 0, 0, 0);
    border-radius: 15px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 12px;
  border-radius: 4px;
`;

const UserName = styled.p`
  grid-area: user-name;
  font-size: 18px;
  margin: 12px 0px;
`;

const Time = styled.p`
  grid-area: time;
  font-size: 12px;
  margin: 0px;
  color: ${props => props.theme.textColor.highOpacity};
`;

const Message = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  grid-area: message;
  margin: 0px;
  color: ${props => props.theme.textColor.mediumOpacity};
  &.sent {
    color: ${props => props.theme.textColor.highOpacity};
  }
`;

const Messages = ({ roomMessages, isFetching }) => {
  const ref = useRef();
  const isAtBottom = useRef(true);

  useLayoutEffect(() => {
    if (isAtBottom.current && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [roomMessages]);

  const handleScroll = () => {
    if (
      ref.current.scrollTop + ref.current.clientHeight ===
      ref.current.scrollHeight
    ) {
      isAtBottom.current = true;
    } else {
      isAtBottom.current = false;
    }
  };

  if (isFetching) {
    return (
      <StyledMessages>
        <Spinner />
      </StyledMessages>
    );
  } else {
    return (
      <StyledMessages onScroll={handleScroll} ref={ref}>
        {roomMessages &&
          Object.keys(roomMessages).map(date => (
            <MessageContainer key={date}>
              <UserName>
                {roomMessages[date].userName}&nbsp;&nbsp;&nbsp;
              </UserName>
              <Time>
                {moment(roomMessages[date].date, 'x').format('h:mm A')}
              </Time>
              <Message className={roomMessages[date].sent ? 'sent' : ''}>
                {roomMessages[date].message}
              </Message>
            </MessageContainer>
          ))}
      </StyledMessages>
    );
  }
};

export default Messages;
