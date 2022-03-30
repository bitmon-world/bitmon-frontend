import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "./actions";

export interface ApplicationState {
  readonly login: boolean;
  readonly token: string;
  readonly id: string;
}

const initialState: ApplicationState = {
  login: false,
  token: "",
  id: "",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(login, (state, action) => {
      state.login = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
    })
    .addCase(logout, (state, action) => {
      state.login = false;
      state.token = "";
      state.id = "";
    })
);
