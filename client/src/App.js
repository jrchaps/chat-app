import React, { useRef, useState, useReducer, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { darkTheme, lightTheme, GlobalStyle } from './Styles';
import io from 'socket.io-client';
import Welcome from './components/Welcome';
import Headers from './components/Headers';
import Rooms from './components/Rooms';
import Messages from './components/Messages';
import Users from './components/Users';
import Form from './components/Form';
import BottomNav from './components/BottomNav';

const MainGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 225px auto 225px;
  grid-template-rows: 70px auto 70px;
  grid-template-areas:
    'rooms-header-container title-header-container user-header-container'
    'rooms messages users'
    'rooms form-container users';
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const HeaderContainer = styled.div`
  grid-area: rooms-header-container;
  display: flex;
  align-items: center;
  background: ${props => props.theme.color.primary.main.fullOpacity};
  border-bottom: 1px solid ${props => props.theme.black.lowOpacity};
`;

const ColorModeButton = styled.button`
  padding: 10px;
  margin: 4px;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
`;

const ColorModeIcon = styled.i`
  font-size: 36px;
  color: ${props => props.theme.textColor.highOpacity};
`;

const TitleHeader = styled.p`
  flex-grow: 1;
  font-size: 20px;
  padding: 10px;
  margin: 4px;
`;

const UserHeader = styled.p`
  font-size: 20px;
  padding: 10px;
  margin: 4px;
  margin-right: 20px;
`;

const onlineUsersReducer = (
  state,
  { type, socketId, userName, room, unreadMessage, users },
) => {
  switch (type) {
    case 'add user':
      return { ...state, [socketId]: { userName, room } };
    case 'add users':
      return { ...users };
    case 'change user notification':
      return { ...state, [socketId]: { ...state[socketId], unreadMessage } };
    case 'change user room':
      return { ...state, [socketId]: { ...state[socketId], room } };
    case 'remove user':
      const { [socketId]: value, ...newState } = state;
      return { ...newState };
    default:
      throw new Error();
  }
};

const typingUsersReducer = (state, { type, socketId, userName }) => {
  switch (type) {
    case 'add typing user':
      return { ...state, [socketId]: userName };
    case 'remove typing user':
      const { [socketId]: value, ...newState } = state;
      return { ...newState };
    default:
      throw new Error();
  }
};

const messagesReducer = (state, { type, message, messages }) => {
  switch (type) {
    case 'add message':
      return { ...state, [message.date]: message };
    case 'add messages':
      return messages;
    default:
      throw new Error();
  }
};

let socket;

let rooms = ['General', 'Technology', 'Music', 'Gaming'];

const App = () => {
  const [messages, setMessages] = useReducer(messagesReducer, {});
  const [onlineUsers, setOnlineUsers] = useReducer(onlineUsersReducer, {});
  const [typingUsers, setTypingUsers] = useReducer(typingUsersReducer, {});
  const [userName, setUserName] = useState();
  const [currentRoom, setCurrentRoom] = useState('General');
  const [title, setTitle] = useState(currentRoom);
  const [privateUser, setPrivateUser] = useState();
  const [inputValue, setInputValue] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [themeToggle, setThemeToggle] = useState(true);
  const isTyping = useRef(false);
  const [navIndex, setNavIndex] = useState(0);
  const [mobileView, setMobileView] = useState(false);

  if (!socket && userName) {
    socket = io(`:3001`, {
      query: {
        userName,
        room: currentRoom,
      },
    });

    socket.on('get online users', users => {
      let newUsers = {};
      Object.keys(users).forEach(
        socketId =>
          (newUsers[socketId] = {
            userName: users[socketId].userName,
            room: users[socketId].room,
          }),
      );
      setOnlineUsers({ type: 'add users', users: newUsers });
    });

    socket.on('get messages', messages => {
      setIsFetching(false);
      let newMessages = {};
      messages.forEach(message => (newMessages[message.date] = message));
      setMessages({ type: 'add messages', messages: newMessages });
    });

    socket.on('user connected', (socketId, userName, room) => {
      setOnlineUsers({
        type: 'add user',
        socketId,
        userName,
        room,
      });
    });

    socket.on('user disconnected', socketId => {
      setOnlineUsers({
        type: 'remove user',
        socketId,
      });
    });

    socket.on('user changed room', (socketId, room) => {
      setOnlineUsers({ type: 'change user room', socketId, room });
    });

    socket.on('chat message', message => {
      setMessages({ type: 'add message', message });
    });

    socket.on('private message notification', socketId => {
      setOnlineUsers({
        type: 'change user notification',
        socketId,
        unreadMessage: true,
      });
    });

    socket.on('user typing', (socketId, userName) => {
      setTypingUsers({
        type: 'add typing user',
        socketId,
        userName,
      });
    });

    socket.on('user stopped typing', socketId => {
      setTypingUsers({
        type: 'remove typing user',
        socketId,
      });
    });
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    let message = {
      userName,
      room: currentRoom,
      message: inputValue,
      date: Date.now(),
      sent: false,
    };

    if (inputValue) {
      setMessages({ type: 'add message', message });

      if (privateUser) {
        socket.emit(
          'chat message',
          message,
          privateUser,
          onlineUsers[privateUser].room,
        );
      } else {
        socket.emit('chat message', message);
      }
    }

    setInputValue('');
    isTyping.current = false;
    socket.emit('user stopped typing');
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (!isTyping.current) {
      socket.emit('user typing');
      isTyping.current = true;
    }
  };

  const handleInputBlur = () => {
    isTyping.current = false;
    socket.emit('user stopped typing');
  };

  const changePrivateRoom = socketId => {
    let privateRoom = (socket.id + socketId)
      .split('')
      .sort()
      .join('');

    if (privateRoom !== currentRoom && socketId !== socket.id) {
      setCurrentRoom(privateRoom);
      setTitle(`@ ${onlineUsers[socketId].userName}`);
      setPrivateUser(socketId);
      setOnlineUsers({
        type: 'change user notification',
        socketId,
        unreadMessage: false,
      });
      setOnlineUsers({
        type: 'change user room',
        socketId: socket.id,
        privateRoom,
      });
      socket.emit('user changed room', privateRoom);
      setIsFetching(true);
    }
  };

  const changeRoom = newRoom => {
    if (newRoom !== currentRoom) {
      setCurrentRoom(newRoom);
      setTitle(newRoom);
      setPrivateUser();
      socket.emit('user changed room', newRoom);
      setOnlineUsers({
        type: 'change user room',
        socketId: socket.id,
        room: newRoom,
      });
      setIsFetching(true);
    }
  };

  const toggleTheme = () => {
    setThemeToggle(!themeToggle);
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && !mobileView) {
        setMobileView(true);
      } else if (window.innerWidth > 768 && mobileView) {
        setMobileView(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileView(true) : setMobileView(false);
  }, []);

  if (userName) {
    if (!mobileView) {
      return (
        <ThemeProvider theme={themeToggle ? darkTheme : lightTheme}>
          <GlobalStyle />
          <MainGrid>
            <Headers
              title={title}
              userName={userName}
              toggleTheme={toggleTheme}
            />
            <Rooms
              rooms={rooms}
              currentRoom={currentRoom}
              onlineUsers={onlineUsers}
              changeRoom={changeRoom}
              changePrivateRoom={changePrivateRoom}
            />
            <Messages roomMessages={messages} isFetching={isFetching} />
            <Users
              onlineUsers={onlineUsers}
              changePrivateRoom={changePrivateRoom}
              clientSocketId={socket.id}
            />
            <Form
              handleFormSubmit={handleFormSubmit}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              inputValue={inputValue}
              typingUsers={typingUsers}
            />
          </MainGrid>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={themeToggle ? darkTheme : lightTheme}>
          <GlobalStyle />
          <MainGrid>
            <HeaderContainer>
              <ColorModeButton
                onClick={toggleTheme}
                onMouseDown={handleMouseDown}
              >
                <ColorModeIcon className='material-icons'>
                  invert_colors
                </ColorModeIcon>
              </ColorModeButton>
              <TitleHeader>{title}</TitleHeader>
              <UserHeader>{userName}</UserHeader>
            </HeaderContainer>
            {navIndex === 0 ? (
              <React.Fragment>
                <Messages roomMessages={messages} isFetching={isFetching} />
                <Form
                  handleFormSubmit={handleFormSubmit}
                  handleInputChange={handleInputChange}
                  handleInputBlur={handleInputBlur}
                  inputValue={inputValue}
                  typingUsers={typingUsers}
                />
              </React.Fragment>
            ) : navIndex === 1 ? (
              <Rooms
                rooms={rooms}
                currentRoom={currentRoom}
                onlineUsers={onlineUsers}
                changeRoom={changeRoom}
                changePrivateRoom={changePrivateRoom}
              />
            ) : (
              <Users
                onlineUsers={onlineUsers}
                changePrivateRoom={changePrivateRoom}
                clientSocketId={socket.id}
              />
            )}

            <BottomNav navIndex={navIndex} setNavIndex={setNavIndex} />
          </MainGrid>
        </ThemeProvider>
      );
    }
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Welcome setUserName={setUserName} />
      </ThemeProvider>
    );
  }
};

export default App;
