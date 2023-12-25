import {CellTypes, DirectionTypes} from "../object-types/cell";

export interface MoveCellPayload {
  id: string;
  direction: DirectionTypes
}

export interface DeleteCellPayload {
  id: string;
}

export interface InsertCellBeforePayload {
  id: string | null; // id of cell before which we want to insert new cell or in the last if null
  type: CellTypes;
}

export interface UpdateCellPayload {
  id: string;
  content: string;
}
