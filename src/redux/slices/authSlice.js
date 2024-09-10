import { createSlice } from '@reduxjs/toolkit'; //1. 슬라이스(slice)생성

const initialState = {
  authData: JSON.parse(localStorage.getItem('authData')) || null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      //업데이트 상태값 변경
      state.authData = action.payload.authData;

      localStorage.setItem('authData', JSON.stringify(action.payload.authData));
    },
    logout: (state) => {
      //상태값 비움
      state.authData = null;

      localStorage.removeItem('authData');
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; //4. exprot된 함수들을 store에 등록
