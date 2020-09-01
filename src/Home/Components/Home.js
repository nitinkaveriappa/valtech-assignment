import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Cards from './Cards';
import { getItems } from '../../Service';
import { ItemsContext } from '../../ContextProvider/ItemsContext';
import { FETCH_ITEMS } from '../../ContextProvider/ContextConstants';

const Home = () => {
  let history = useHistory();
  const signal = axios.CancelToken.source();
  const [itemsState, dispatch] = useContext(ItemsContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const fetchItems = async () => {
      try {
        const response = await getItems(signal.token);
        dispatch({ type: FETCH_ITEMS, payload: response });
        setLoader(false);
      } catch (error) {
        console.log('API Error', error);
      }
    };
    fetchItems();
    return () => {
      signal.cancel('Request Cancelled');
    };
  }, []);

  console.log(itemsState);

  const handleAdd = () => {
    history.push(`/form/new`);
  };

  return (
    <>
      {loader ? (
        <>Loading...</>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5">Trending Projects</Typography>
            <Typography variant="subtitle2">
              Most Sought-after Projects in Bengaluru
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add New Project
            </Button>
          </Grid>
          <Cards />
        </Grid>
      )}
    </>
  );
};

export default Home;
