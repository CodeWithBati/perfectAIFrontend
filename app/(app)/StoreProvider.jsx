'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/lib/store';

export default function StoreProvider({ children }) {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}{' '}
      </PersistGate>
    </Provider>
  );
}
