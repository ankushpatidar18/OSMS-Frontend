import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminInfo: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload
    },
    clearAdminInfo: (state) => {
      state.adminInfo = null
    },
  },
})

export const { setAdminInfo, clearAdminInfo } = adminSlice.actions
export default adminSlice.reducer
