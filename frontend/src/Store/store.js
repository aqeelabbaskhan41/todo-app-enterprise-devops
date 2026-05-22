// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Load persisted auth state from localStorage on startup
const loadState = () => {
  try {
    const serialized = localStorage.getItem('authState');
    return serialized ? { user: JSON.parse(serialized) } : undefined;
  } catch {
    return undefined;
  }
};

// Save auth state to localStorage whenever it changes
const saveState = (state) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state.user));
  } catch {
    // ignore write errors
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
