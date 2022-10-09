import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IData from "../../models/IData";

interface UserState {
    data: IData[],
    loading: boolean,
    error: string
}
const initialState: UserState = {
    data: [],
    loading: false,
    error: ""
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
            state.error = ""
        },
        fetchingSuccess(state, action: PayloadAction<IData[]>) {
            state.loading = false
            state.error = ""
            state.data = action.payload
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default dataSlice.reducer