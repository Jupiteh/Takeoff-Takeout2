import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.webp'; // Assurez-vous que le chemin est correct

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body, html, #root {
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url(${background}) no-repeat center center fixed;
    background-size: cover;
    color: #ffffff;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #f0ad4e;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1em;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #f0ad4e;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    background-color: #f0ad4e;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.9;
    }

    &:focus {
      outline: none;
    }
  }

  input, textarea {
    font-family: inherit;
  }

  .container {
    padding: 20px;
    margin: auto;
    max-width: 1200px;
  }

  .content {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  .sidebar {
    background-color: #1c2a35;
    padding: 20px;
    height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5); // Ajout d'un fond semi-transparent pour le contenu principal
    color: #ecf0f1;
  }
`;

export default GlobalStyles;