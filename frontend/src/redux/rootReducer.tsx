import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'

export const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  userReducer
  })