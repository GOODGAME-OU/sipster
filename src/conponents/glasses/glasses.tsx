import { useLayoutEffect, useRef } from 'react';
import Glass from '../glass/glass';
import './glasses.css';

const Glasses = ({ glasses, addGlass }: { glasses: boolean[]; addGlass: () => void }) => {
    const gridRef = useRef<HTMLDivElement>(null);

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
