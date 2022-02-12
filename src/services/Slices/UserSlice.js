import {createSlice} from '@reduxjs/toolkit';
import {crud} from "../crud";

import { Redirect, Route } from "react-router";
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const {setUser} = UserSlice.actions;
export const makeLogin = (params) => async (dispatch) => {
    const {user ,token} = await crud.create("/api/login/", params);
    localStorage.setItem('login_token',token);
    dispatch(setUser(user));
};

export const makeLogout = (params) => async (dispatch) => {
    const token =window.localStorage.getItem("login_token")
    console.log("token===",token);
    await crud.create("/api/logout/");
    localStorage.removeItem('theme');
   
    localStorage.removeItem(token);
    dispatch(setUser({}));
}

export const retrieve = (params) => async (dispatch) => {
    const {user} = await crud.retrieve("user", params);
    dispatch(setUser(user))
    return user;
}

export const selectUser = (state) => state.user.user;
export default UserSlice.reducer;
