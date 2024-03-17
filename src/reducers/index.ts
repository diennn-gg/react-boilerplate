import { combineReducers } from "@reduxjs/toolkit";
import auth from './authentication'

export const rootReducer = combineReducers({
  auth
});