import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import map from 'lodash/map';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Popover,
  Tooltip,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
  Popper,
  Paper,
  Fade,
} from '@material-ui/core';

import Buttons from './Buttons';
import { ItemsContext } from '../../ContextProvider/ItemsContext';
import { DELETE_ITEM } from '../../ContextProvider/ContextConstants';

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

const Cards = ({ items }) => {
  const classes = useStyles();
  let history = useHistory();

  // const [anchorEl, setAnchorEl] = useState(null);
  const [showButton, setShowButton] = useState({});
  const [itemsState, dispatch] = useContext(ItemsContext);

  const handleEdit = (id) => {
    history.push(`/form/${id}`);
  };

  const handleDelete = (id) => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };

  // const handlePopoverOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  const handlePopoverOpen = (event, id) => {
    console.log(event, id);
    setShowButton((prevState) => ({ ...prevState, [id]: true }));
  };

  const handlePopoverClose = (event, id) => {
    console.log(event, id);
    setShowButton((prevState) => ({ ...prevState, [id]: false }));
  };

  // const handlePopover = (event) => {
  //   console.log(event);
  //   setAnchorEl((prevState) => (prevState ? null : event.currentTarget));
  // };

  // if (anchorEl) {
  //   console.log({ anchorEl }, anchorEl.clientHeight, anchorEl.clientWidth);
  // }

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
                // onClick={handlePopover}
                onMouseEnter={(e) => handlePopoverOpen(e, item.id)}
                onMouseLeave={(e) => handlePopoverClose(e, item.id)}
              >
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.location}
                    </Typography>
                    <Tooltip title={item.desc} placement="bottom">
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
            {/* {Boolean(anchorEl) && (
              <Popover
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
              >
                <Grid
                  style={{
                    opacity: '0.1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignIitems: 'center',
                    backgroundColor: 'transparent',
                    background: 'transparent',
                    width: anchorEl.clientWidth,
                    height: anchorEl.clientHeight,
                  }}
                >
                  <Buttons
                    item={item}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </Grid>
              </Popover>
            )} */}
          </Grid>
        ))}
    </>
  );
};

export default Cards;
