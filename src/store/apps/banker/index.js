import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchbankerdata', async (params, { getState, dispatch }) => {
    console.log(params)
    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }


        const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/banker/bankers?search=${params?.q}`, {
            headers
        })

        console.log("data", response.data)
        response.data.params = params

        return response
    } catch (err) {
        console.log(response.data)
        console.log(err.message)
    }
})

export const addBanker = createAsyncThunk('addbanker', async (data, { getState, dispatch, rejectWithValue }) => {

    console.log("addbanker", data)
    console.log(getState().auth.token)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/banker/createBanker`, data, { headers })
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update banker')

        return rejectWithValue(err.response.data)
    }
})

export const editBanker = createAsyncThunk('editbanker', async (params, { getState, dispatch, rejectWithValue }) => {
    console.log(getState().auth.token)
    console.log(params)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const data = params.data;
        const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/banker/updateBanker/${params.bankerId}`, data, { headers });
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update banker')

        return rejectWithValue(err.response.data)
    }
})

export const branchSlice = createSlice({
    name: 'Banker',
    initialState: {
        banker: [],
        total: 1,
        params: {},
        allData: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            console.log("action", action)
            state.total = action.payload.totalBranchs
            state.params = action.payload.params
            state.allData = action.payload
            state.banker = action.payload.data.banker
        })
    }
})

export default branchSlice.reducer
