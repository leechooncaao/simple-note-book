import {Fragment} from "react";
import {useAppSelector} from "../hooks";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const {data, order} = useAppSelector(state => state.cells)

  return <div>
    <AddCell forceVisible={order.length === 0} previousCellId={null} />
    {order.map((id) => <Fragment key={id}>
      <CellListItem cell={data[id]} />
      <AddCell previousCellId={id} />
    </Fragment>)}
  </div>
};

export default CellList;
