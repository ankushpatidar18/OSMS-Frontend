import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,      
  userChecked: false,  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      state.userChecked = true;
    },
    clearUserInfo(state) {
      state.userInfo = null;
      state.userChecked = true;
    },
    setUserChecked(state, action) {
      state.userChecked = action.payload;
    },
  },
});

export const { setUserInfo, clearUserInfo, setUserChecked } = userSlice.actions;
export default userSlice.reducer;
