import React from 'react';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';

const Loader = styled(animated.div)`
  margin: 20px auto;
  font-size: 10px;
  border-top: 5px solid ${props => props.theme.color.primary.main.highOpacity};
  border-right: 5px solid ${props => props.theme.color.primary.main.highOpacity};
  border-bottom: 5px solid
    ${props => props.theme.color.primary.main.highOpacity};
  border-left: 5px solid
    ${props => props.theme.color.secondary.light.fullOpacity};
  border-radius: 100%;
  width: 40px;
  height: 40px;
`;

const Spinner = () => {
  const spring = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async next => {
      while (1) {
        await next({ transform: 'rotate(360deg)' });
      }
    },
    reset: true,
  });

  return (
    <div>
      <Loader style={spring}></Loader>
    </div>
  );
};

export default Spinner;
