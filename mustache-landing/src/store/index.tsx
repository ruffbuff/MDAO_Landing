import { configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from './app.slice';
import { reducer as userReducer } from './user.slice';

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  },
  devTools: true
});