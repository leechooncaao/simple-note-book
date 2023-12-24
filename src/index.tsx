import ReactDOM from 'react-dom/client';
import './index.css';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>  
  );
};

root.render(<App />);
