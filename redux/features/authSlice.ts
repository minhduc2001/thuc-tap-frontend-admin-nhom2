import useAuthApi from "@/hooks/useAuthApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ILogin {}

export const callRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async () => {
    const { refreshToken } = useAuthApi();
    const response = await refreshToken();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      accessToken: null,
      error: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.accessToken = action.payload.accessToken;
      state.login.error = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.accessToken = null;
      state.login.error = null;
    },
    logoutFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
