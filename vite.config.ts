/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import appData from './package.json';
import { createHtmlPlugin } from 'vite-plugin-html';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => {
    console.log(
        `%c 🐳 ${command}: ${appData.settings.name} | ${appData.version} | ${mode}`,
        'color:green; font-size:20px;',
    );

    const isDev = mode === 'development';

    const plugins = [
        react(),
        ConditionalCompile(),
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
    ];

    if (!isDev) {
        plugins.push(
            VitePWA({
                registerType: 'autoUpdate',
                injectRegister: 'auto',
                manifest: {
                    name: 'Sipster',
                    short_name: 'Sipster',
                    start_url: '/sipster/',
                    display: 'standalone',
                    background_color: '#f3f7fc',
                    theme_color: '#4da6ff',
                    icons: [
                        {
                            src: '/assets/icon-192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/assets/icon-512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            }));
    }

    return {
        base: isDev ? '/' : '/sipster/',
        plugins,
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
