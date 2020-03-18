import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme.color.primary.dark.fullOpacity};
`;

const Form = styled.form`
  display: flex;
  margin: auto;
  padding: 5px;
  border-bottom: 1px solid ${props => props.theme.textColor.highOpacity};
`;

const Input = styled.input`
  font-size: 24px;
  padding: 8px;
  color: ${props => props.theme.textColor.highOpacity};
  background: ${props => props.theme.color.primary.dark.fullOpacity};
  border: none;
  outline: none;
  &::placeholder {
    color: ${props => props.theme.textColor.mediumOpacity};
  }
`;

const Button = styled.button`
  margin: auto;
  padding: 10px 15px;
  cursor: pointer;
  color: ${props => props.theme.textColor.highOpacity};
  background: ${props => props.theme.color.primary.main.highOpacity};
  border: 1px solid ${props => props.theme.black.highOpacity};
  border-radius: 4px;
  &:hover {
    background: ${props => props.theme.color.primary.main.mediumOpacity};
  }
`;

const Welcome = ({ setUserName }) => {
  const [value, setValue] = useState('');

  const handleInputChange = e => {
    setValue(e.target.value);
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setUserName(value);
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Input
          onChange={handleInputChange}
          placeholder='Enter your nickname'
          maxLength='15'
        ></Input>
        <Button type='submit' onMouseDown={handleMouseDown}>
          Go!
        </Button>
      </Form>
    </Container>
  );
};

export default Welcome;
