import React from 'react';
import { Box, Button, ButtonGroup } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Buttons = ({ handleDelete, handleEdit, item }) => {
  return (
    <Box alignItems="center">
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => handleEdit(item.id)} startIcon={<EditIcon />}>
          Edit
        </Button>

        <Button
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
