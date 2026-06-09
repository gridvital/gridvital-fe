
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.slice";
import uiReducer from "./ui/ui.slice";
import dashboardReducer from "./dashboard/dashboard.slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "authToken", "userId", "customerId"]
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    ui: uiReducer,
    dashboard: dashboardReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
