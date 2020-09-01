import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Cards from './Cards';

const Home = () => {
  let history = useHistory();

  const handleAdd = () => {
    history.push(`/form/new`);
  };

  return (
    <>
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
    </>
  );
};

export default Home;
