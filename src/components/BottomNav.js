import React, { useRef, useState, useReducer } from 'react';
import styled from 'styled-components/macro';

const StyledBottomNav = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.black.lowOpacity};
  background: ${props => props.theme.color.primary.dark.fullOpacity};
`;

const Button = styled.button`
  flex-grow: 1;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  color: ${props =>
    props.active
      ? props.theme.color.secondary.main.fullOpacity
      : props.theme.textColor.highOpacity};
  border-right: 1px solid ${props => props.theme.black.lowOpacity};
  &:nth-last-child(1) {
    border: none;
  }
`;

const ButtonLabel = styled.p`
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

const Icon = styled.i`
  font-size: 18px;
`;

const BottomNav = ({ navIndex, setNavIndex }) => {
  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <StyledBottomNav>
      <Button
        active={navIndex === 0 && true}
        onClick={() => setNavIndex(0)}
        onMouseDown={handleMouseDown}
      >
        <Icon className='material-icons'>chat_bubble</Icon>
        <ButtonLabel>Chat</ButtonLabel>
      </Button>
      <Button
        active={navIndex === 1 && true}
        onClick={() => setNavIndex(1)}
        onMouseDown={handleMouseDown}
      >
        <Icon className='material-icons'>meeting_room</Icon>
        <ButtonLabel>Rooms</ButtonLabel>
      </Button>
      <Button
        active={navIndex === 2 && true}
        onClick={() => setNavIndex(2)}
        onMouseDown={handleMouseDown}
      >
        <Icon className='material-icons'>account_box</Icon>
        <ButtonLabel>Users</ButtonLabel>
      </Button>
    </StyledBottomNav>
  );
};

export default BottomNav;
