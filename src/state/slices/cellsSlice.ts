import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {DeleteCellPayload, InsertCellBeforePayload, MoveCellPayload, UpdateCellPayload} from "../payload-types/cellsPayload";
import {Cell} from "../object-types/cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ['1', '2'],
  data: {
    '1': {
      id: '1',
      content: '',
      type: 'code'
    },
    '2': {
      id: '2',
      content: '',
      type: 'text'
    }
  }
}

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    move: (state, { payload }: PayloadAction<MoveCellPayload>) => {
      const { id, direction } = payload;
      const currentIndex = state.order.findIndex(cellId => cellId === id);
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[currentIndex] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },

    deleteCell: (state, { payload }: PayloadAction<DeleteCellPayload>) => {
      const { id } = payload;
      state.order = state.order.filter(cellId => cellId !== id);
      delete state.data[id];
    },

    insertAfter: (state, { payload }: PayloadAction<InsertCellBeforePayload>) => {
      const cell: Cell = {
        content: '',
        type: payload.type,
        id: randomId()
      };

      state.data[cell.id] = cell;

      const index = state.order.findIndex(id => id === payload.id);

      if (index < 0) state.order.unshift(cell.id);
      else state.order.splice(index + 1, 0, cell.id);
    },

    update: (state, { payload }: PayloadAction<UpdateCellPayload>) => {
      const { id, content } = payload;
      state.data[id].content = content;
    }
  }
});

const randomId = () => (Math.random().toString(36).substring(2, 5));

export const {move, deleteCell, insertAfter, update } = cellsSlice.actions;

export default cellsSlice.reducer;
