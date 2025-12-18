/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import appData from './package.json';
import manifest from './public/assets/manifest.json';
import { createHtmlPlugin } from 'vite-plugin-html';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => {
    console.log(
        `%c 🐳 ${command}: ${appData.settings.name} | ${appData.version} | ${mode}`,
        'color:green; font-size:20px;',
    );

    const isDev = mode === 'development';

    return {
        base: '/sipster/',
        plugins: [
            react(),
            ConditionalCompile(),
            VitePWA({
                includeAssets: [
                    'assets/icons/favicon.ico',
                    'assets/icons/apple-touch-icon.png',
                    'assets/icons/favicon-96x96.png',
                    'assets/icons/screenshot1.png',
                ],
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true,
                },
                injectRegister: 'auto',
                manifest: manifest as any,
            }),
            createHtmlPlugin({
                minify: !isDev,
                entry: 'src/main.tsx',
                template: 'index.html',
                inject: {
                    data: {
                        title: appData.settings.name,
                        injectScript: `<script type="module" src="/src/main.tsx"></script>`,
                    },
                },
            }),
        ],
        define: {
            APP_ID: JSON.stringify(appData.name),
            APP_NAME: JSON.stringify(appData.settings.name),
            APP_VERSION: JSON.stringify(appData.version),
        },
        build: {
            sourcemap: isDev,
            minify: !isDev,
            emptyOutDir: true,
            reportCompressedSize: true,
        },
        server: {
            host: '0.0.0.0',
            port: 1836,
            open: false,
            // https: true,
        },
        preview: {
            port: 8080,
            open: true,
        },
    };
});
