import { createReducer, nanoid } from "@reduxjs/toolkit";
import { login, logout } from "./actions";

export interface ApplicationState {
  readonly login: boolean;
  readonly token: string;
}

const initialState: ApplicationState = {
  login: false,
  token: "",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(login, (state, action) => {
      state.login = true;
      state.token = action.payload.token;
    })
    .addCase(logout, (state, action) => {
      state.login = false;
      state.token = "";
    })
);
