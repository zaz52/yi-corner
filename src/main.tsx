import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const base = import.meta.env.BASE_URL;
const isHome = window.location.pathname === base || window.location.pathname === `${base}index.html`;
const classic = new URLSearchParams(window.location.search).get('view') === 'classic';
if (!import.meta.env.DEV && isHome && !classic && !window.location.hash) {
  window.location.replace(`${base}world/`);
} else createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
