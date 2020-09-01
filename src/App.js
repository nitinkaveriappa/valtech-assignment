import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import ErrorBoundary from './ErrorBoundary';
import { ItemsContext } from './ContextProvider/ItemsContext';
import { getItems } from './Service';
import { FETCH_ITEMS } from './ContextProvider/ContextConstants';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#000000',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
  },
});

const App = () => {
  const signal = axios.CancelToken.source();
  const [itemsState, dispatch] = useContext(ItemsContext);

  const fetchItems = async () => {
    try {
      const response = await getItems(signal.token);
      dispatch({ type: FETCH_ITEMS, payload: response });
    } catch (error) {
      console.log('API Error', error);
    }
  };

  useEffect(() => {
    fetchItems();
    return () => {
      signal.cancel('Request Cancelled');
    };
  }, []);

  console.log(itemsState);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
