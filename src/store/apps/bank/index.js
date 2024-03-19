import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchbankdata', async (params, { getState, dispatch }) => {
  try {
    const headers = {
      Authorization: 'Bearer ' + getState().auth.token
    }

    const response = await axios.get(`https://habitus-admin-api.applore.in/api/v1/bank/banks?search=${params.q}`, {
      headers
    })

    response.data.params = params

    return response.data
  } catch (err) {
    console.log(err.message)
  }
})

export const addBank = createAsyncThunk('addbank', async (data, { getState, dispatch, rejectWithValue }) => {
  
  console.log("addBank",data)
  console.log(getState().auth.token)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getState().auth.token
  }

  try {
    const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/bank/createBank`, data, { headers })
    console.log(response.data)

    return response.data;
  } catch (err) {
    console.log('Failed to update banks')

    return rejectWithValue(err.response.data)
  }
})

export const editBank = createAsyncThunk('editbank', async(params,{getState, dispatch, rejectWithValue})=>{
  console.log(getState().auth.token)
  console.log(params)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getState().auth.token
  }
  const data = params.data;
  try {
    const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/bank/updateBank/${params.bankId}`,data, {headers});
    console.log(response.data)

    return response.data;
  }catch(err){
    console.log('Failed to update bank')
    console.log(err)
    
return rejectWithValue(err.response.data)
  }
})

export const bankSlice = createSlice({
  name: 'Bank',
  initialState: {
    banks: [],
    total: 1,
    params: {},
    allData: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.total = action.payload.totalBanks
      state.params = action.payload.params
      state.allData = action.payload
      state.banks = action.payload.banks
    })
  }
})

export default bankSlice.reducer
