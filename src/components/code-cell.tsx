import './code-cell.css';
import React, {useEffect} from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import {Cell, startBundling, update} from '../state';
import {useAppDispatch, useAppSelector} from '../hooks';
import {selectCumulativeCode} from '../state/selectors';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector(state => state.bundles[cell.id])
  const cumulativeCode = useAppSelector(state => selectCumulativeCode(state, cell)).join('\n');

  useEffect(() => {
    if (!bundle) {
      dispatch(startBundling({cellId: cell.id, input: cumulativeCode}));
      return;
    }

    const timer = setTimeout(() => {
      dispatch(startBundling({cellId: cell.id, input: cumulativeCode}));
    }, 750);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id]);

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
