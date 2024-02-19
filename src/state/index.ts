import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import { updateVersion } from '@/state/global/actions';
import configs from '@/configs';

const reducers = combineReducers(reducer);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['application'],
  blacklist: ['useL2Service'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).concat(configs.isProd ? [] : [thunk, logger]),
});

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(updateVersion());

export default store;
