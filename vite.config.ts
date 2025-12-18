/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import appData from './package.json';
import { createHtmlPlugin } from 'vite-plugin-html';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import manifest from './public/assets/manifest.json';

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
                workbox: {
                    cleanupOutdatedCaches: true,
                    clientsClaim: true,
                    skipWaiting: true,

                    runtimeCaching: [
                        {
                            // 🔹 Cache API responses
                            urlPattern: ({ url }) =>
                                url.origin === 'https://api.sipster.app',

                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'api-cache',
                                networkTimeoutSeconds: 3,
                                expiration: {
                                    maxEntries: 50,
                                    maxAgeSeconds: 60 * 60, // 1 hour
                                },
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                            },
                        },

                        {
                            // 🔹 Cache images
                            urlPattern: ({ request }) => request.destination === 'image',
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'image-cache',
                                expiration: {
                                    maxEntries: 60,
                                    maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                                },
                            },
                        },
                    ],
                },
                manifest: manifest as Partial<ManifestOptions>
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
