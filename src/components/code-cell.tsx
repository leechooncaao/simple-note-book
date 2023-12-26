import React, {useEffect, useState} from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import {Cell, update} from '../state';
import {useAppDispatch} from '../hooks';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => dispatch(update({id: cell.id, content: value}))}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
