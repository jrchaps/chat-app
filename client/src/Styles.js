import { createGlobalStyle } from 'styled-components/macro';
import normalize from 'normalize.css'; // eslint-disable-line no-unused-vars

export const darkTheme = {
  bodyBackground: '#102027',
  fontFamily: 'Roboto',
  textColor: {
    highOpacity: 'rgba(255, 255, 255, 0.87)',
    mediumOpacity: 'rgba(255, 255, 255, 0.6)',
  },
  black: {
    highOpacity: 'rgba(0, 0, 0, 0.87)',
    mediumOpacity: 'rgba(0, 0, 0, 0.6)',
    lowOpacity: 'rgba(0, 0, 0, 0.38)',
  },
  white: {
    highOpacity: 'rgba(255, 255, 255, 0.87)',
    mediumOpacity: 'rgba(255, 255, 255, 0.6)',
    lowOpacity: 'rgba(255, 255, 255, 0.38)',
  },
  color: {
    primary: {
      main: {
        fullOpacity: '#37474f',
        highOpacity: 'rgba(55, 71, 79, 0.87)',
        mediumOpacity: 'rgba(55, 71, 79, 0.6)',
        lowOpacity: 'rgba(55, 71, 79, 0.38)',
      },
      dark: {
        fullOpacity: '#102027',
        highOpacity: 'rgb(16, 32, 39, 0.87)',
        mediumOpacity: 'rgb(16, 32, 39, 0.6)',
        lowOpacity: 'rgb(16, 32, 39, 0.38)',
      },
      light: {
        fullOpacity: '#62727b',
        highOpacity: 'rgba(98, 114, 123, 0.87)',
        mediumOpacity: 'rgba(98, 114, 123, 0.6)',
        lowOpacity: 'rgba(98, 114, 123, 0.38)',
      },
    },
    secondary: {
      main: {
        fullOpacity: '#00838f',
        highOpacity: 'rgba(0, 131, 143, 0.87)',
        mediumOpacity: 'rgba(0, 131, 143, 0.6)',
        lowOpacity: 'rgba(0, 131, 143, 0.38)',
      },
      dark: {
        fullOpacity: '#005662',
        highOpacity: 'rgba(0, 86, 98, 0.87)',
        mediumOpacity: 'rgba(0, 86, 98, 0.6)',
        lowOpacity: 'rgba(0, 86, 98, 0.38)',
      },
      light: {
        fullOpacity: '#4fb3bf',
        highOpacity: 'rgba(79, 179, 191, 0.87)',
        mediumOpacity: 'rgba(79, 179, 191, 0.6)',
        lowOpacity: 'rgba(79, 179, 191, 0.38)',
      },
    },
  },
};

export const lightTheme = {
  bodyBackground: '#102027',
  fontFamily: 'Roboto',
  textColor: {
    highOpacity: 'rgba(0, 0, 0, 0.87)',
    mediumOpacity: 'rgba(0, 0, 0, 0.6)',
  },
  black: {
    highOpacity: 'rgba(0, 0, 0, 0.87)',
    mediumOpacity: 'rgba(0, 0, 0, 0.6)',
    lowOpacity: 'rgba(0, 0, 0, 0.38)',
  },
  white: {
    highOpacity: 'rgba(255, 255, 255, 0.87)',
    mediumOpacity: 'rgba(255, 255, 255, 0.6)',
    lowOpacity: 'rgba(255, 255, 255, 0.38)',
  },
  color: {
    primary: {
      main: {
        fullOpacity: '#eceff1',
        highOpacity: 'rgba(236, 239, 241, 0.87)',
        mediumOpacity: 'rgba(236, 239, 241, 0.6)',
        lowOpacity: 'rgba(236, 239, 241, 0.38)',
      },
      dark: {
        fullOpacity: '#babdbe',
        highOpacity: 'rgb(186, 189, 190, 0.87)',
        mediumOpacity: 'rgb(186, 189, 190, 0.6)',
        lowOpacity: 'rgb(186, 189, 190, 0.38)',
      },
      light: {
        fullOpacity: '#ffffff',
        highOpacity: 'rgba(255, 255, 255, 0.87)',
        mediumOpacity: 'rgba(255, 255, 255, 0.6)',
        lowOpacity: 'rgba(255, 255, 255, 0.38)',
      },
    },
    secondary: {
      main: {
        fullOpacity: '#00838f',
        highOpacity: 'rgba(0, 131, 143, 0.87)',
        mediumOpacity: 'rgba(0, 131, 143, 0.6)',
        lowOpacity: 'rgba(0, 131, 143, 0.38)',
      },
      dark: {
        fullOpacity: '#005662',
        highOpacity: 'rgba(0, 86, 98, 0.87)',
        mediumOpacity: 'rgba(0, 86, 98, 0.6)',
        lowOpacity: 'rgba(0, 86, 98, 0.38)',
      },
      light: {
        fullOpacity: '#4fb3bf',
        highOpacity: 'rgba(79, 179, 191, 0.87)',
        mediumOpacity: 'rgba(79, 179, 191, 0.6)',
        lowOpacity: 'rgba(79, 179, 191, 0.38)',
      },
    },
  },
};

export const GlobalStyle = createGlobalStyle`
 body {
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.textColor.highOpacity};
 }
`;
