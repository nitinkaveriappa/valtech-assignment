import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import map from 'lodash/map';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fade,
  Grid,
  Card,
  Tooltip,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
} from '@material-ui/core';

import Buttons from './Buttons';
import { ItemsContext } from '../../ContextProvider/ItemsContext';
// import { DELETE_ITEM } from '../../ContextProvider/ContextConstants';
import { deleteItem } from '../../Service';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    height: 200,
  },
  cardDetails: {
    flex: 1,
    height: 150,
  },
  cardMedia: {
    width: 200,
    height: 200,
  },
});

const Cards = () => {
  const classes = useStyles();
  let history = useHistory();
  const signal = axios.CancelToken.source();

  const [showButton, setShowButton] = useState({});
  const [itemsState, dispatch] = useContext(ItemsContext);

  const handleEdit = (id) => {
    history.push(`/form/${id}`);
  };

  const handleDelete = async (id) => {
    // dispatch({
    //   type: DELETE_ITEM,
    //   payload: id,
    // });
    try {
      await deleteItem(id, signal.token);
    } catch (error) {
      console.log('API Error', error);
    }
  };

  const handlePopoverOpen = (event, id) => {
    setShowButton((prevState) => ({ ...prevState, [id]: true }));
  };

  const handlePopoverClose = (event, id) => {
    setShowButton((prevState) => ({ ...prevState, [id]: false }));
  };

  return (
    <>
      {itemsState.items.length > 0 &&
        map(itemsState.items, (item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.imgURL}
                title={item.imgTitle}
              />
              <CardActionArea
                onMouseEnter={(e) => handlePopoverOpen(e, item.id)}
                onMouseLeave={(e) => handlePopoverClose(e, item.id)}
              >
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.location}
                    </Typography>
                    <Tooltip title={item.desc} placement="right">
                      <Typography
                        variant="body1"
                        // noWrap
                        paragraph
                      >
                        {item.desc.length > 40
                          ? `${item.desc.substring(0, 40)}...`
                          : `${item.desc}`}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                </div>
                <Fade in={showButton[item.id]}>
                  <CardActions>
                    <Buttons
                      item={item}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  </CardActions>
                </Fade>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default Cards;
