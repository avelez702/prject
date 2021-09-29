import { useMemo } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import myReducer from './myReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import players from './players';
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

//add my own reducer

export function createStore(preloadedState, composedEnhancer) {
  return configureStore({
    preloadedState,
    reducer: combineReducers({
      players,
      myReducer,
    }),
  });
}

export function useStore(initialState) {
  return useMemo(() => createStore(initialState), [initialState]);
}
