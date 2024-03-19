import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchgstdata', async (params, { getState, dispatch }) => {
    console.log(params)
    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }


        const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/gst/allGsts?search=${params?.q}`, {
            headers,
        })
        console.log("data", response.data)
        response.data.params = params

     

        return response
    } catch (err) {
        console.log(response.data)
        console.log(err.message)
    }
})

export const addGst = createAsyncThunk('addgst', async (data, { getState, dispatch, rejectWithValue }) => {

    console.log("addGst", data)
    console.log(getState().auth.token)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/gst/createGst`, data, { headers })

        
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update branchs')

        return rejectWithValue(err.response.data)
    }
})

export const editGst = createAsyncThunk('editgst', async (params, { getState, dispatch, rejectWithValue }) => {
    console.log(getState().auth.token)
    console.log(params)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const data = params.data;
        
        const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/gst/updateGst/${params.gstId}`, data, { headers });
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update gst')


        //my code
        return rejectWithValue(err.response?.data || 'Failed to update GST');

        // return rejectWithValue(err.response.data)
    }
})

export const branchSlice = createSlice({
    name: 'gst',
    initialState: {
        gst: [],
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
            state.gst = action.payload.data.gst
        })
    }
})

export default branchSlice.reducer
