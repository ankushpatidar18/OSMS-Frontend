import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminInfo: null,
  adminChecked: false, // <-- new
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
 reducers: {
  setAdminInfo: (state, action) => {
    state.adminInfo = action.payload;
    state.adminChecked = true; // 
  },
  clearAdminInfo: (state) => {
    state.adminInfo = null;
    state.adminChecked = true; // 
  },
  setAdminChecked: (state, action) => {
    state.adminChecked = action.payload;
  }
},
})

export const { setAdminInfo, clearAdminInfo,setAdminChecked } = adminSlice.actions
export default adminSlice.reducer
