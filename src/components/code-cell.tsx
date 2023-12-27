import './code-cell.css';
import React, {useEffect} from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import {Cell, startBundling, update} from '../state';
import {useAppDispatch, useAppSelector} from '../hooks';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector(state => state.bundles[cell.id])

  useEffect(() => {
    if (!bundle) {
      dispatch(startBundling({cellId: cell.id, input: cell.content}));
      return;
    }

    const timer = setTimeout(() => {
      dispatch(startBundling({cellId: cell.id, input: cell.content}));
    }, 750);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content, cell.id]);

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => dispatch(update({id: cell.id, content: value}))}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {
            !bundle || bundle.loading
              ?
              <div className='progress-cover'>
                <progress className='progress is-small is-primary' max='100'>Loading</progress>
              </div>
              : <Preview code={bundle.code} err={bundle.err} />
          }
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
