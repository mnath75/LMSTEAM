import { createSlice } from '@reduxjs/toolkit';
import {Themes} from "../../Theme/theme";

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {
        value:Themes
    },
    reducers: {
        changeTheme: (state, action) => {
            localStorage.setItem('theme',JSON.stringify(action.payload))
            state.value = action.payload;
        },
    },
});
export const {changeTheme} = ThemeSlice.actions;
export const selectTheme = (state) => state.theme.value;
export default ThemeSlice.reducer;
