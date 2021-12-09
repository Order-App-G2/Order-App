import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import messageReducer from './reducers/messageReducer'
export const rootReducer = combineReducers({
  authReducer,
  messageReducer
  })