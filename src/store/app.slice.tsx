import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: true,
    sidebar: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleMode: (state:any) => {
            state.mode = !state.mode;
        },
        toggleMenu: (state:any) => {
            state.sidebar = !state.sidebar;
        }
    }
});

export const { actions, reducer } = appSlice;