import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {encryptTransform} from "redux-persist-transform-encrypt";
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "./slices";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_SECRET_KEY as string,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor= persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
