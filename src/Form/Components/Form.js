import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import find from 'lodash/find';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

import { ItemsContext } from '../../ContextProvider/ItemsContext';
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
import { putItem, postItem } from '../../Service';

const Form = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const signal = axios.CancelToken.source();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleButtonClick = async () => {
    // dispatch({
    //   type: isEdit ? UPDATE_ITEMS : ADD_ITEMS,
    //   payload: item,
    // });
    if (isEdit) {
      try {
        const response = await putItem(id, item, signal.token);
      } catch (error) {
        console.log('API Error', error);
      }
    } else {
      try {
        const response = await postItem(item, signal.token);
      } catch (error) {
        console.log('API Error', error);
      }
    }
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
                {isEdit ? `Update` : `Add`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
