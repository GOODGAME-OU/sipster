import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

const { MODE, DEV } = import.meta.env;
import HomePage from './pages/HomePage.tsx';
import { Outlet } from 'react-router-dom';
import { tryToInstallPWA } from './utils/pwa.ts';
import { i18n, switchLang } from './utils/i18n.ts';

tryToInstallPWA();

if (DEV) {
    console.info(`🐳 ${APP_NAME} | ${APP_VERSION} | ${MODE}`);
}

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route path="/" element={<HomePage />} />
        </Route>,
    ),
);

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

console.log(i18n().header.home);
switchLang('ru');
console.log(i18n().header.home);
