import React, { createContext, useReducer } from 'react';

import { FETCH_ITEMS } from './ContextConstants';

const initialState = {
  items: [],
};

const reducer = (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload
        ? {
            ...state,
            items: action.payload,
          }
        : state;
    default:
      return state;
  }
};

// Create Context Object
export const ItemsContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const ItemsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ItemsContext.Provider value={[state, dispatch]}>
      {props.children}
    </ItemsContext.Provider>
  );
};
