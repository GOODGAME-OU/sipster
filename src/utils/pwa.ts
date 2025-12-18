import { pwaInstallHandler } from 'pwa-install-handler';
import ls from 'localstorage-slim';

export function tryToInstallPWA() {
    const isPwaInstalled = ls.get('pwaInstalled');
    const lastTryTime = ls.get<number>('pwaLastTryTime');
    const lastTryMoreThanADay = isLastTryTimeMoreThanADay(lastTryTime);

    if (!isPwaInstalled && lastTryMoreThanADay) {
        document.body.addEventListener('click', async () => installPWA(), { once: true });
    }
}

export function installPWA() {
    pwaInstallHandler.addListener(async (canInstall: boolean) => {
        if (canInstall) {
            try {
                const result = await pwaInstallHandler.install();

                if (result) {
                    ls.set('pwaInstalled', true);
                }
            } catch (error) {
                console.log('error', error);
                ls.set('pwaLastTryTime', Date.now());
            } finally {
                ls.set('pwaLastTryTime', Date.now());
            }
        }
    });
}

function isLastTryTimeMoreThanADay(lastTryTime: number | null) {
    return !lastTryTime || Date.now() - lastTryTime > 1000 * 60 * 60 * 24;
}
