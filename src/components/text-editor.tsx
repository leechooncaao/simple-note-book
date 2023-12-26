import './text-editor.css';
import MDEditor from "@uiw/react-md-editor";
import {useEffect, useRef, useState} from "react";
import {Cell, update} from '../state';
import {useAppDispatch} from '../hooks';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    }
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    }
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => dispatch(update({id: cell.id, content: v || ''}))} />
      </div>
    )
  }

  return <div className='text-editor card' onClick={() => setEditing(true)}>
    <div className='card-content'>
      <MDEditor.Markdown source={cell.content || 'Click to edit'} />
    </div>
  </div>;
};

export default TextEditor;
