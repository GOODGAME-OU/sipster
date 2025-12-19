import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';

const { MODE, DEV } = import.meta.env;
import HomePage from './pages/HomePage.tsx';
import { tryToInstallPWA } from './utils/pwa.ts';

tryToInstallPWA();

if (DEV) {
    console.info(`🐳 ${APP_NAME} | ${APP_VERSION} | ${MODE}`);
}

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

createRoot(root).render(<HomePage />);
