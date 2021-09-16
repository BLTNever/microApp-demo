import { combineReducers } from "redux"
import { menu } from './menu.reducer'

export const reducers = combineReducers(
    {
        menu,
    }
);