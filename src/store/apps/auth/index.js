import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk('/login', params => {
  return params
})

export const logout = createAsyncThunk('/logout', async params => {})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      ;(state.token = action.payload.token), (state.user = action.payload.user)
    }),
      builder.addCase(logout.fulfilled, (state, action) => {
        ;(state.token = null), (state.user = null)
      })
  }
})

export default authSlice.reducer
