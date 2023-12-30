import {createSelector} from "@reduxjs/toolkit";
import {Cell} from "../object-types/cell";
import {RootState} from "../store";

const selectCellId = (_: any, cell: Cell) => cell.id;

export const selectAllCells = (state: RootState) => state.cells;

export const selectCumulativeCode = createSelector(selectAllCells, selectCellId, (cells, cellId) => {
  const {data, order} = cells;
  const orderedCells = order.map(id => data[id]);

  const showFunc =
    `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.getElementById('root');
      if(typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.createRoot(root).render(value);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    }
  `;

  const showFuncNoop = 'var show = () => {}';
  const result = [];
  for (let c of orderedCells) {
    if (c.type === 'code') {
      if (c.id === cellId) result.push(showFunc);
      else result.push(showFuncNoop);

      result.push(c.content);
    }
    if (c.id === cellId) break;
  }

  return result;
});
