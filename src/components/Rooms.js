import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';

const RoomsContainer = styled.div`
  flex-grow: 1;
  grid-area: rooms;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${props => props.theme.color.primary.main.fullOpacity};
  border-right: 1px solid ${props => props.theme.black.highOpacity};
  @media (max-width: 768px) {
    border-right: none;
  }
  &::-webkit-scrollbar {
    width: 20px;
    background: ${props => props.theme.color.primary.dark.lowOpacity};
    border: 5px solid ${props => props.theme.color.primary.main.fullOpacity};
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.color.primary.dark.highOpacity};
    background-clip: padding-box;
    border: 5px solid rgba(0, 0, 0, 0);
    border-radius: 15px;
  }
`;

const Rooms = ({
  rooms,
  currentRoom,
  onlineUsers,
  changeRoom,
  changePrivateRoom,
}) => {
  return (
    <RoomsContainer>
      {rooms.map(room => (
        <Room
          changeRoom={changeRoom}
          changePrivateRoom={changePrivateRoom}
          onlineUsers={onlineUsers}
          room={room}
          currentRoom={currentRoom}
          key={room}
        />
      ))}
    </RoomsContainer>
  );
};

export default Rooms;

const StyledRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: ${props => props.theme.color.primary.dark.lowOpacity};
  }
`;

const RoomIcon = styled(animated.i)`
  color: ${props => props.theme.textColor.highOpacity};
`;

const RoomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
  background: none;
  border: none;
  opacity: ${props => (props.shown ? 1 : 0)};
`;

const RoomUser = styled(StyledRoom)`
  margin-left: 30px;
`;

const ListContainer = styled.div``;

const RoomUserList = styled(animated.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: ${props => props.height};
`;

const Room = ({
  onlineUsers,
  changeRoom,
  changePrivateRoom,
  room,
  currentRoom,
}) => {
  const [isOpen, setIsOpen] = useState(room === currentRoom);
  const [isFirstAnimation, setIsFirstAnimation] = useState(true);
  const roomUserListRef = useRef();

  const [iconSpring, setIconSpring] = useSpring(() => ({
    config: { mass: 1, tension: 300, friction: 30 },
  }));

  const [listSpring, setListSpring] = useSpring(() => ({
    config: { mass: 1, tension: 300, friction: 30 },
  }));

  useEffect(() => {
    room === currentRoom ? setIsOpen(true) : setIsOpen(false);
  }, [room, currentRoom]);

  useLayoutEffect(() => {
    setIsFirstAnimation(true);
  }, [currentRoom]);

  if (isFirstAnimation) {
    setListSpring({
      height: room === currentRoom ? 'auto' : 0,
      immediate: true,
    });
    setIconSpring({
      transform: room === currentRoom ? 'rotate(90deg)' : 'rotate(0deg)',
      immediate: true,
    });
    setIsFirstAnimation(false);
  }

  const toggleRoomUserList = e => {
    e.stopPropagation();
    if (!isOpen) {
      setListSpring({
        to: async next => {
          await next({ height: roomUserListRef.current.scrollHeight });
          next({ height: 'auto' });
        },
        immediate: false,
      });
      setIconSpring({ transform: 'rotate(90deg)', immediate: false });
    } else {
      setListSpring({
        to: async next => {
          if (listSpring.height.value === 'auto') {
            await next({ height: roomUserListRef.current.scrollHeight });
            next({ height: 0 });
          } else {
            next({ height: 0 });
          }
        },
        immediate: false,
      });
      setIconSpring({ transform: 'rotate(0deg)', immediate: false });
    }
    setIsOpen(!isOpen);
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <StyledRoom onClick={() => changeRoom(room)}>
        {room}
        <RoomButton
          onClick={toggleRoomUserList}
          onMouseDown={handleMouseDown}
          disabled={
            Object.keys(onlineUsers).filter(
              socketId => onlineUsers[socketId].room === room,
            ).length < 1
          }
          shown={
            Object.keys(onlineUsers).filter(
              socketId => onlineUsers[socketId].room === room,
            ).length > 0
          }
        >
          <RoomIcon className='material-icons' style={iconSpring}>
            arrow_right
          </RoomIcon>
        </RoomButton>
      </StyledRoom>
      <ListContainer>
        <RoomUserList ref={roomUserListRef} style={listSpring}>
          {Object.keys(onlineUsers)
            .filter(socketId => onlineUsers[socketId].room === room)
            .map(socketId => (
              <RoomUser
                onClick={() => changePrivateRoom(socketId)}
                key={socketId}
              >
                {onlineUsers[socketId].userName}
              </RoomUser>
            ))}
        </RoomUserList>
      </ListContainer>
    </React.Fragment>
  );
};
