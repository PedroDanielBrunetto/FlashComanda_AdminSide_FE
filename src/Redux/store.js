import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './Ducks/index.js'; 

const persistConfig = {
  key: 'root',
  storage,   
  whitelist: ['exampleReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export { store, persistor };
