import {TypedUseSelectorHook, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../state/store";
import {useSelector} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
