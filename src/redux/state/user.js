import {  createReducer } from "@reduxjs/toolkit";
import { setLogin, setLogOut, getUser } from "../actions/user";

const userReducer = createReducer({}, {
    [setLogin.fulfilled]: (state, action) => action.payload,
    [setLogin.rejected]: (state, action) => "RECHAZADO",
    [setLogOut.fulfilled]: (state, action) => ({}),
    [getUser.fulfilled]: (state, action) => action.payload
  })

  export default userReducer;