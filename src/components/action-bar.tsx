import './action-bar.css';
import {useAppDispatch} from "../hooks";
import {deleteCell, move} from "../state";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
  const dispatch = useAppDispatch();

  return <div className="action-bar">
    <button
      className="button is-primary is-small"
      onClick={() => dispatch(move({id, direction: 'up'}))}
    >
      <span className="icon">
        <i className="fas fa-arrow-up"></i>
      </span>
    </button>
    <button
      className="button is-primary is-small"
      onClick={() => dispatch(move({id, direction: 'down'}))}
    >
      <span className="icon">
        <i className="fas fa-arrow-down"></i>
      </span>
    </button>
    <button
      className="button is-primary is-small"
      onClick={() => dispatch(deleteCell({id}))}
    >
      <span className="icon">
        <i className="fas fa-times"></i>
      </span>
    </button>
  </div>
}

export default ActionBar;
