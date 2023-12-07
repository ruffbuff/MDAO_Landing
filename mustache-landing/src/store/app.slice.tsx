import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: true
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleMode: (state:any) => {
            state.mode = !state.mode;
        }
    }
});

export const { actions, reducer } = appSlice;