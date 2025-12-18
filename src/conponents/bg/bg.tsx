import './bg.css';
import bg from './bg.png';

const BG = () => {
    return (
        <div className="bg-container">
            <img className="bg" src={bg} alt="Background" />
        </div>
    );
};

export default BG;
