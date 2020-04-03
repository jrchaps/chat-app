import React from 'react';
import styled from 'styled-components/macro';

const RoomsHeaderContainer = styled.div`
  grid-area: rooms-header-container;
  display: flex;
  align-items: center;
  background: ${props => props.theme.color.primary.main.fullOpacity};
  border-bottom: 1px solid ${props => props.theme.black.lowOpacity};
  border-right: 1px solid ${props => props.theme.black.highOpacity};
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

const TitleHeaderContainer = styled(RoomsHeaderContainer)`
  grid-area: title-header-container;
  border-right: none;
  background: ${props => props.theme.color.primary.dark.fullOpacity};
`;

const TitleHeader = styled.p`
  font-size: 20px;
  padding: 10px;
  margin: 4px;
`;

const UserHeaderContainer = styled(RoomsHeaderContainer)`
  grid-area: user-header-container;
  border-right: none;
  border-left: 1px solid ${props => props.theme.black.highOpacity};
`;

const UserHeader = styled(TitleHeader)``;

const Headers = ({ title, userName, toggleTheme }) => {
  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <RoomsHeaderContainer>
        <ColorModeButton onClick={toggleTheme} onMouseDown={handleMouseDown}>
          <ColorModeIcon className='material-icons'>
            invert_colors
          </ColorModeIcon>
        </ColorModeButton>
      </RoomsHeaderContainer>
      <TitleHeaderContainer>
        <TitleHeader>{title}</TitleHeader>
      </TitleHeaderContainer>
      <UserHeaderContainer>
        <UserHeader>{userName}</UserHeader>
      </UserHeaderContainer>
    </React.Fragment>
  );
};

export default Headers;
