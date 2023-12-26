import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import store from './state/store';
import CellList from './components/cell-list';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);
