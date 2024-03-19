import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Fetch Users
export const fetchData = createAsyncThunk('company/fetchData', async (params, {getState}) => {
  const token = localStorage.getItem('accessToken')
  console.log("page",params.page+1)
  console.log("limit",params.limit)
  const page = params.page;
  const limit = params.limit
  
  try {
    const response = await axios.get(
      `https://habitus-admin-api.applore.in/api/v1/company/companies?search=${params.q}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token
        }
      }
    )
    response.data.params = params

    return response.data
  } catch (err) {
    console.log(err.message)
  }
})

// add company
export const addCompany = createAsyncThunk('company/addCompany', async (data, { getState, dispatch, rejectWithValue }) => {

 

  const headers = {
    'Content-Type': 'application/json', // Adjust the content type as needed
    Authorization: 'Bearer ' + getState().auth.token // Add your authorization token if required
  }
  try {

    const response = await axios.post(`https://habitus-admin-api.applore.in/api/v1/company/createCompany`, data, {
      headers
    })
    
  return response.data
  }catch(err){
    console.log(err.response.data.error)
    
    return rejectWithValue(err.response.data);
  }

 
})

export const editCompany = createAsyncThunk('company/editCompany', async (params, { getState, dispatch,rejectWithValue }) => {
  const id = params.id
  const data = params.data
  console.log('from store', id, data)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getState().auth.token
  }
   try {

     const response = await axios.patch(`https://habitus-admin-api.applore.in/api/v1/company/updateCompany/${id}`, data, {
       headers
      })

      return response.data
    }catch(err){
      console.log(err.message)
      
return rejectWithValue(err.response.data);
    }

})

export const companySlice = createSlice({
  name: 'Company',
  initialState: {
    companies: [],
    total: 1,
    params: {},
    allData: {},
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // state.data = action.payload.users
      state.total = action.payload.totalCompanies
      state.params = action.payload.params
      state.allData = action.payload
      state.companies = action.payload.companies
      state.error = null;
    })
 
    .addCase(addCompany.rejected, (state, action) =>{
      state.error = action.payload
    })
  }
})

export default companySlice.reducer
