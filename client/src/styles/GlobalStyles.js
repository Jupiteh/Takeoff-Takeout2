import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.webp'; // Assurez-vous que le chemin est correct

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #2b3e50;
  }

  #root {
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  h1, h2 {
    color: #f0ad4e;
  }

  button {
    background-color: #f0ad4e;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: opacity 0.3s ease;
  }

  button:hover {
    opacity: 0.9;
  }
`;

export default GlobalStyles;
