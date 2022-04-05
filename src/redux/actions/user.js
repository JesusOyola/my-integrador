import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setLogin = createAsyncThunk("LOGIN", (user)=>{ 
  
   return axios
  .post("/api/users/login", user)
  .then((res) => res.data)
  .catch(err => console.log({err})) 

  
});

export const setLogOut = createAsyncThunk("LOGOUT", () => {
  return axios
  .post("/api/users/logout")
  .then(res => res.data)
  .catch((err)=> console.log(err))
});

export const getUser = createAsyncThunk("GETUSER", ()=>{
  return axios
  .get("/api/users/me")
  .then(res => res.data)
});


