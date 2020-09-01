import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import map from 'lodash/map';
import filter from 'lodash/filter';
import {
  FETCH_ITEMS,
  ADD_ITEMS,
  UPDATE_ITEMS,
  DELETE_ITEM,
} from './ContextConstants';

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
    case ADD_ITEMS:
      return action.payload
        ? {
            ...state,

            items: [...state.items, { ...action.payload, id: uuidv4() }],
          }
        : state;
    case UPDATE_ITEMS:
      return action.payload
        ? {
            ...state,
            items: map(state.items, (originalItem) =>
              originalItem.id === action.payload.id
                ? action.payload
                : originalItem
            ),
          }
        : state;
    case DELETE_ITEM:
      return action.payload
        ? {
            ...state,
            items: filter(state.items, (item) => item.id !== action.payload),
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
