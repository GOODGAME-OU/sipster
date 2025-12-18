import './glass.css';

const Glass = ({ full, onClickHandler }: { full: boolean; onClickHandler: () => void }) => {
    return (
        <button onClick={onClickHandler} className="glass-container">
            {full && <div className="glass-fill" />}
        </button>
    );
};

export default Glass;
