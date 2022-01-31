import {createSlice} from '@reduxjs/toolkit';
import {crud} from "../crud";
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
    const {user} = await crud.create("login/", params);
    dispatch(setUser(user))
};

export const makeLogout = (params) => async (dispatch) => {
    await crud.delete("login-token");
    localStorage.removeItem('theme')
    dispatch(setUser({}));
}

export const retrieve = (params) => async (dispatch) => {
    const {user} = await crud.retrieve("user", params);
    dispatch(setUser(user))
    return user;
}

export const selectUser = (state) => state.user.user;
export default UserSlice.reducer;
