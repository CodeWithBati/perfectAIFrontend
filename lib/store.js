import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import Cookies from 'js-cookie';

import setupCheckerReducer from './features/setupChecker/setupCheckerSlice';
import authReducer, { setUser } from './features/auth/authSlice';

const rootReducer = combineReducers({
  setupChecker: setupCheckerReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: require('redux-persist/lib/storage').default,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  const token = Cookies.get('token');
  const user = Cookies.get('user');
  if (token && user) {
    store.dispatch(setUser({ user, token, isAuthenticated: true }));
  }

  return { store, persistor };
};
