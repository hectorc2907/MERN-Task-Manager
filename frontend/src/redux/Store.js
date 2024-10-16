import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "./AuthSlice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
  reducer: {
    Auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
