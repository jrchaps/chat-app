import React from 'react';
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

const UsersContainer = styled(RoomsContainer)`
  grid-area: users;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${props => props.theme.color.primary.main.fullOpacity};
  border-right: none;
  border-left: 1px solid ${props => props.theme.black.highOpacity};
  @media (max-width: 768px) {
    border-left: none;
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

const Header = styled.p`
  font-size: 24px;
  margin: 40px auto;
`;

const Users = ({ onlineUsers, changePrivateRoom, clientSocketId }) => {
  return (
    <UsersContainer>
      {Object.keys(onlineUsers).map(
        socketId =>
          socketId !== clientSocketId && (
            <User
              user={onlineUsers[socketId]}
              changePrivateRoom={changePrivateRoom}
              socketId={socketId}
            />
          ),
      )}
    </UsersContainer>
  );
};

export default Users;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: ${props => props.theme.color.primary.dark.lowOpacity};
  }
`;

const MailIcon = styled(animated.i)`
  font-size: 24px;
  color: ${props => props.theme.color.secondary.light.fullOpacity};
  opacity: ${props => (props.shown ? 1 : 0)};
`;

const User = ({ user, changePrivateRoom, socketId }) => {
  const iconSpring = useSpring({ opacity: user.unreadMessage ? 1 : 0 });

  return (
    <StyledUser onClick={() => changePrivateRoom(socketId)}>
      {user.userName}
      <MailIcon className='material-icons' style={iconSpring}>
        mail
      </MailIcon>
    </StyledUser>
  );
};
