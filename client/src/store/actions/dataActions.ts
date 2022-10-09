import {AppDispatch} from "../store";
import axios from "axios";
import IData from "../../models/IData";
import {dataSlice} from "../reducers/dataSlice";

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(dataSlice.actions.fetching())
        const {data} = await axios.get<IData[]>("http://localhost:4000/api/data")
        dispatch(dataSlice.actions.fetchingSuccess(data))
    } catch (e) {
        dispatch(dataSlice.actions.fetchingError(e as Error))
    }
}

export default {
    fetchData
}