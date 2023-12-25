import {useAppSelector} from "../hooks";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const {data, order} = useAppSelector(state => state.cells)

  return <div>
    {order.map((id) => <CellListItem cell={data[id]} key={id} />)}
  </div>
};

export default CellList;
