import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchemployeedata', async (params, { getState, dispatch }) => {
    console.log(params)
    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }




        const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/employee/employees?search=${params?.q}`, {
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

export const addEmployee = createAsyncThunk('addemployee', async (data, { getState, dispatch, rejectWithValue }) => {

    console.log("addEmployee", data)
    console.log(getState().auth.token)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/employee/createEmployee`, data, { headers })
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update employee')

        return rejectWithValue(err.response.data)
    }
})

export const editEmployee = createAsyncThunk('editemployee', async (params, { getState, dispatch, rejectWithValue }) => {
    console.log(getState().auth.token)
    console.log(params)
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getState().auth.token
        }
        const data = params.data;
        const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/employee/updateEmployee/${params.accountlistId}`, data, { headers });
        console.log(response.data)
    } catch (err) {
        console.log('Failed to update employee')

        return rejectWithValue(err.response.data)
    }
})

export const branchSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: [],
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
            state.employee = action.payload.data.employees
        })
    }
})

export default branchSlice.reducer
