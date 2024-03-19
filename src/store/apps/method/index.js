import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('fetchmethoddata', async (params, { getState, dispatch }) => {
    console.log(params);

    try {
        const headers = {
            Authorization: 'Bearer ' + getState().auth.token
        }

        const response = await axios.get('https://habitus-admin-api.applore.in/api/v1/method/allMethods?page=1&limit=5', {
            headers,
        });

        console.log("data", response.data);

         
        const responseData = { ...response.data, params };

        return responseData;

    }


 catch (err) {
    console.error("Error:", err.message);
    console.log("Error Response:", err.response.data);
    throw err;  
}
});


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
    name: 'method',
    initialState: {
        method: [],
        total: 1,
        params: {},
        allData: {}
    },
    reducers: {},

    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
          console.log("action", action);
        
          if (action.payload && action.payload.methods && Array.isArray(action.payload.methods)) {
            // Check if the expected properties are present in the payload
            state.total = action.payload.totalMethods;
            state.params = action.payload.params;
            state.allData = action.payload.methods; // Use 'methods' for mapping
            state.method = action.payload.methods.map(method => method.name);
          }
        });
      }
      

 
   
})

export default branchSlice.reducer
