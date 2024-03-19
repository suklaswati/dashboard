import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchmarketer', async (params, { getState, dispatch }) => {
    console.log(params)
    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }





        const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/employee/marketers`, {
            headers
        })
        console.log("12345data", response?.data?.data)

        // response.data.params = params

        return response ?? "sagar"
    } catch (err) {
        console.log(response.data)
        console.log(err.message)
    }
})

export const addBranch = createAsyncThunk('addbranch', async (data, { getState, dispatch, rejectWithValue }) => {

    console.log("addBranch", data)
    console.log(getState().auth.token)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/branch/createBranch`, data, { headers })
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update branchs')

        return rejectWithValue(err.response.data)
    }
})

export const editBank = createAsyncThunk('editbank', async (params, { getState, dispatch, rejectWithValue }) => {
    console.log(getState().auth.token)
    console.log(params)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const data = params.data;
        const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/bank/updateBank/${params.bankId}`, data, { headers });
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update bank')

        return rejectWithValue(err.response.data)
    }
})

export const branchSlice = createSlice({
    name: 'myMarketer',
    initialState: {
        myMarketer: [],
        total: 1,
        params: {},
        allData: {}
    },
    reducers: {},
    extraReducers: builder => {

        builder.addCase(fetchData.fulfilled, (state, action) => {
            // console.log("action", action);
            // state.total = action.payload.totalmyMarketers; // Update this line
            // state.params = action.payload.params;
            // state.allData = action.payload;
            // state.myMarketer = action.payload.data.myMarketer; // Update this line

            console.log("action", action);
            const { totalmyMarketers, params, data } = action.payload;
            state.total = totalmyMarketers;
            state.params = params;
            state.allData = action.payload; // You may want to reconsider this line
            state.myMarketer = data && data.myMarketer;
        })
    }
})









export default branchSlice.reducer
