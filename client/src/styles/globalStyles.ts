import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }

  html {
    font-size:62.5%;
  }

  html, body, #__next {
    height: 100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
  }

`;

export const Main = styled.main`
  flex-grow: 1;
`;

export default GlobalStyles;
