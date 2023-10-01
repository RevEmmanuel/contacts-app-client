import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAuthSlice {
  isAuthenticated: boolean;
  token?: string;
}

const initialState: IAuthSlice = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = undefined;
      state.isAuthenticated = false;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
