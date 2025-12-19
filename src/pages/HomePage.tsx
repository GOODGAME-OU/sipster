import BG from '../conponents/bg/bg';
import Glasses from '../conponents/glasses/glasses';
import ls from 'localstorage-slim';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const HomePage = () => {
    let state = 0;
    const notify = () => toast('State updated');

    const getStorageID = (): string => {
        const today = new Date();
        const todayString =
            String(today.getDate()).padStart(2, '0') +
            '.' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '.' +
            today.getFullYear();

        return `waterState-${todayString}`;
    };

    const updateState = () => {
        if (document.visibilityState === 'visible') {
            state = ls.get(getStorageID()) as number;
            notify();
        }
    };

    window.addEventListener('focus', () => updateState());
    updateState();

    const [glasses, setGlasses] = useState<boolean[]>([
        state > 0,
        state > 1,
        state > 2,
        state > 3,
        state > 4,
        state > 5,
        state > 6,
        state > 7,
        state > 8,
        state > 9,
    ]);

    const addGlass = () => {
        setGlasses((prev) => {
            const newGlasses = [...prev];
            for (let i = 0; i < newGlasses.length; i++) {
                if (!newGlasses[i]) {
                    newGlasses[i] = true;
                    state = i + 1;
                    break;
                }
            }
            ls.set(getStorageID(), state);
            return newGlasses;
        });
    };

    return (
        <>
            <BG />
            <Glasses glasses={glasses} addGlass={addGlass} />
            <ToastContainer />
        </>
    );
};

export default HomePage;
