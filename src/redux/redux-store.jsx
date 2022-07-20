import {configureStore} from '@reduxjs/toolkit';
import {shopsReducer} from '../redux/Reducer'

export const store = configureStore({
    reducer: {
        shops: shopsReducer,
      }
});
