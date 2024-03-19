import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchleadMarketer', async (params, { getState, dispatch }) => {
    console.log(params)
    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }


        const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/employee/getLeadMarketers?search${params?.q}`, {
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
    name: 'leadMarketer',
    initialState: {
        leadMarketer: [],
        total: 1,
        params: {},
        allData: {}
    },
    reducers: {},
    extraReducers: builder => {

    builder.addCase(fetchData.fulfilled, (state, action) => {
        console.log("action", action);
        state.total = action.payload.totalLeadMarketers; // Update this line
        state.params = action.payload.params;
        state.allData = action.payload;
        state.leadMarketer = action.payload.data.leadMarketers; // Update this line
    })
}
})




 



 
export default branchSlice.reducer
