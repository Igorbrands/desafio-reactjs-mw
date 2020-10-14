import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/github-bg.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-black) url(${githubBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
  :root {
    /* Color Properties */
    --color-white: #ffffff;
    --color-black: #000000;
    --color-green: #21ffb5;
    --color-purple: #A700FF;
    --color-dark-purple: #37124a;
    --color-pink: #ff00fd;
    --color-blue: #0000ff;
    --color-dark: #1d1d1d;
    --color-light: #DBE9F5;
}
`;
