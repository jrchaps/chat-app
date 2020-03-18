import React from 'react';
import styled from 'styled-components/macro';

const FormContainer = styled.div`
  grid-area: form-container;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 10px;
  padding-bottom: 30px;
  padding-top: 0px;
  background: ${props => props.theme.color.primary.dark.fullOpacity};
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  color: ${props => props.theme.textColor.highOpacity};
  border: 1px solid ${props => props.theme.black.highOpacity};
  border-radius: 4px;
  outline: none;
  background: ${props => props.theme.color.primary.main.highOpacity};
  margin-right: 5px;
`;

const SendButton = styled.button`
  padding: 10px;
  cursor: pointer;
  color: ${props => props.theme.textColor.highOpacity};
  background: ${props => props.theme.color.primary.main.highOpacity};
  border: 1px solid ${props => props.theme.black.highOpacity};
  border-radius: 4px;
  &:hover {
    background: ${props => props.theme.color.primary.main.mediumOpacity};
  }
`;

const UserTypingMessage = styled.p`
  align-self: center;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 0px;
  color: ${props => props.theme.white.mediumOpacity};
`;

const Form = ({
  handleFormSubmit,
  handleInputChange,
  handleInputBlur,
  inputValue,
  typingUsers,
}) => {
  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleFormSubmit}>
        <Input
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={inputValue}
        />
        <SendButton type='submit' onMouseDown={handleMouseDown}>
          Send
        </SendButton>
      </StyledForm>
      {Object.keys(typingUsers).length === 1
        ? Object.keys(typingUsers).map(socketId => (
            <UserTypingMessage>
              {typingUsers[socketId]} is typing...
            </UserTypingMessage>
          ))
        : Object.keys(typingUsers).length === 2
        ? Object.keys(typingUsers).map((socketId, index) =>
            index === 0 ? (
              <UserTypingMessage>
                {typingUsers[socketId]} and&nbsp;
              </UserTypingMessage>
            ) : (
              <UserTypingMessage>
                {typingUsers[socketId]} are typing...
              </UserTypingMessage>
            ),
          )
        : Object.keys(typingUsers).map((socketId, index) =>
            index === Object.keys(typingUsers).length - 1 ? (
              <UserTypingMessage>
                {typingUsers[socketId]} are typing...
              </UserTypingMessage>
            ) : (
              <UserTypingMessage>
                {typingUsers[socketId]},&nbsp;
              </UserTypingMessage>
            ),
          )}
    </FormContainer>
  );
};

export default Form;
