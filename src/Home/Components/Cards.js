import React, { useContext } from 'react';
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

  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopover = (event) => {
    console.log(event);
    setAnchorEl((prevState) => (prevState ? null : event.currentTarget));
  };

  const open = Boolean(anchorEl);
  console.log({ anchorEl });

  return (
    <>
      {itemsState.items.length > 0 &&
        map(itemsState.items, (item) => (
          <Grid item xs={12} md={4} key={item.id} onClick={handlePopover}>
            <Card
              className={classes.card}
              // onMouseEnter={handlePopoverOpen}
              // onMouseLeave={handlePopoverClose}
            >
              <CardMedia
                className={classes.cardMedia}
                image={item.imgURL}
                title={item.imgTitle}
              />
              <CardActionArea>
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
                <CardActions>
                  <Buttons
                    item={item}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </CardActions>
              </CardActionArea>
            </Card>
            {/* {open && (
              <Popover
                // className={classes.popover}
                // classes={{
                //   paper: classes.paper,
                // }}
                width={anchorEl.clientWidth}
                height={anchorEl.clientHeight}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Buttons client={anchorEl} />
              </Popover>
            )} */}
          </Grid>
        ))}
    </>
  );
};

export default Cards;
