import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterReducer';
import { logger } from './middleware/logger';
const rootReducer = combineReducers({
    counter: counterReducer,
  });

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
