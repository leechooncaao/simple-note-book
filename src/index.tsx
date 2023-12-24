import ReactDOM from 'react-dom/client';
import './index.css';
import CodeCell from './components/code-cell';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>  
  );
};

root.render(<App />);
