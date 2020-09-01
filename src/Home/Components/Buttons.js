import React from 'react';
import { Box, Grid, Button, ButtonGroup } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Buttons = ({ handleDelete, handleEdit, item }) => {
  return (
    <Box
      alignItems="center"
      // width={client.clientWidth}
      // height={client.clientHeight}
    >
      <ButtonGroup variant="contained" color="primary">
        <Button
          // variant="contained"
          // color="primary"
          onClick={() => handleEdit(item.id)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>

        <Button
          // variant="contained"
          // color="primary"
          onClick={() => handleDelete(item.id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Buttons;
