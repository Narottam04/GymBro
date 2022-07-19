import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import { exerciseApi } from '../features/exercise/exerciseApi';
import exerciseReducer from '../features/exercise/exerciseSlice'
import { videoApi } from '../features/YtVideo/videoApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware),
});
