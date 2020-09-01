import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import find from 'lodash/find';
import map from 'lodash/map';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

import { ItemsContext } from '../../ContextProvider/ItemsContext';
import {
  UPDATE_ITEMS,
  ADD_ITEMS,
} from '../../ContextProvider/ContextConstants';
import {
  DEVELOPER_LOGO_IMAGE_URL,
  DEVELOPER_NAME,
  YEARS_OF_EXPERIENCE,
  PROJECTS_COUNT,
  DESCRIPTION,
  PROJECT_NAME,
  PROJECT_LOCATION,
  PROJECT_IMAGE_URL,
} from './FormConstants';

const Form = (props) => {
  const { id } = useParams();
  let history = useHistory();

  const [itemsState, dispatch] = useContext(ItemsContext);
  const [item, setItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const searchResult = find(itemsState.items, (item) => `${item.id}` === id);
    if (searchResult) {
      setItem(searchResult);
      setIsEdit(true);
    }
  }, [id, itemsState]);

  console.log({ id, item });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setItem({ ...item, [name]: value });
  };

  const handleButtonClick = () => {
    dispatch({
      type: isEdit ? UPDATE_ITEMS : ADD_ITEMS,
      payload: item,
    });
    history.push(`/home`);
  };

  return (
    <>
      <Grid container spacing={2} justify="center">
        <Grid item xs={6}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Typography variant="h5">Featured Developers</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={DEVELOPER_LOGO_IMAGE_URL}
                label="Developer Logo Image URL"
                placeholder="Developer Logo Image URL"
                name={DEVELOPER_LOGO_IMAGE_URL}
                fullWidth
                value={item[DEVELOPER_LOGO_IMAGE_URL]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={DEVELOPER_NAME}
                label="Developer Name"
                placeholder="Developer Name"
                name={DEVELOPER_NAME}
                fullWidth
                value={item[DEVELOPER_NAME]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={YEARS_OF_EXPERIENCE}
                label="Years of Experience"
                placeholder="Years of Experience"
                name={YEARS_OF_EXPERIENCE}
                fullWidth
                value={item[YEARS_OF_EXPERIENCE]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={PROJECTS_COUNT}
                label="Projects Count"
                placeholder="Projects Count"
                name={PROJECTS_COUNT}
                fullWidth
                value={item[PROJECTS_COUNT]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={DESCRIPTION}
                label="Description"
                placeholder="Description"
                name={DESCRIPTION}
                fullWidth
                multiline
                rowsMax={6}
                value={item[DESCRIPTION]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={PROJECT_NAME}
                label="Project Name"
                placeholder="Project Name"
                name={PROJECT_NAME}
                fullWidth
                value={item[PROJECT_NAME]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={PROJECT_LOCATION}
                label="Projects Location"
                placeholder="Project Location"
                name={PROJECT_LOCATION}
                fullWidth
                value={item[PROJECT_LOCATION]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                id={PROJECT_IMAGE_URL}
                label="Project Image URL"
                placeholder="Project Image URL"
                name={PROJECT_IMAGE_URL}
                fullWidth
                value={item[PROJECT_IMAGE_URL]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                fullWidth
              >
                {setIsEdit ? `Update` : `Add`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
