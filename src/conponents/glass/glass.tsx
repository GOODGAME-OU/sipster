import './glass.css';
import glassFill from './glass-fill.png';
import glassEmpty from './glass-empty.png';

const Glass = ({ full, onClickHandler }: { full: boolean; onClickHandler: () => void }) => {
    return (
        <button onClick={onClickHandler} className="glass-container">
            <img src={glassEmpty} alt="Glass" />
            {full && <img src={glassFill} alt="Glass" className="glass-fill" />}
        </button>
    );
};

export default Glass;
