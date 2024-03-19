import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchbranchdata', async (params, { getState, dispatch }) => {
    console.log(params)
  try {
    const headers = {
      Authorization: 'Bearer ' + getState().auth.token
    }


    const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/branch/branches?search=${params.q}`, {
      headers
    })

    response.data.params = params
    console.log(response.data)

    return response.data
  } catch (err) {
    console.log(response.data)
    console.log(err.message)
  }
})

export const addBranch = createAsyncThunk('addbranch', async (data, { getState, dispatch, rejectWithValue }) => {
  
  console.log("addBranch",data) 
  console.log(getState().auth.token)
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getState().auth.token
    }
    const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/branch/createBranch`, data, { headers })
    console.log(response.data)

    return response.data
  } catch (err) {
    console.log('Failed to update branchs')
    
return rejectWithValue(err.response.data)
  }
})

export const editBranch = createAsyncThunk('editbank', async(params,{getState, dispatch, rejectWithValue})=>{
  console.log(getState().auth.token)
  console.log(params)
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getState().auth.token
    }
    const data = params.data;
    const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/branch/updateBranch/${params.branchId}`,data, {headers});
    console.log(response.data)

    return response.data;
  }catch(err){
    console.log('Failed to update branch')

    return rejectWithValue(err.response.data)
  }
})

export const branchSlice = createSlice({
  name: 'Branch',
  initialState: {
    branchs: [],
    total: 1,
    params: {},
    allData: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.total = action.payload.totalBranchs
      state.params = action.payload.params
      state.allData = action.payload
      state.branchs = action.payload.branchs
    })
  }
})

export default branchSlice.reducer
