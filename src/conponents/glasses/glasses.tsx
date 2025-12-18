import { useLayoutEffect, useRef, useState } from 'react';
import Glass from '../glass/glass';
import './glasses.css';
import ls from 'localstorage-slim';

const Glasses = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const today = new Date();
    const todayString =
        String(today.getDate()).padStart(2, '0') +
        '.' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '.' +
        today.getFullYear();
    const storageID = `waterState-${todayString}`;
    let state = ls.get(storageID) as number;

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
            ls.set(storageID, state);
            return newGlasses;
        });
    };

    useLayoutEffect(() => {
        const el = gridRef.current!;
        const maxWidht = 410;

        const resize = () => {
            let scale = Math.min(1, (window.innerWidth - 165) / el.scrollWidth);

            if (el.scrollWidth * scale > maxWidht) {
                scale = maxWidht / el.scrollWidth;
            }

            el.style.transform = `scale(${scale})`;
        };

        resize();

        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="glasses-container">
            <div className="glasses-grid" ref={gridRef}>
                {glasses.map((full, index) => (
                    <Glass key={index} full={full} onClickHandler={addGlass} />
                ))}
            </div>
        </div>
    );
};

export default Glasses;
