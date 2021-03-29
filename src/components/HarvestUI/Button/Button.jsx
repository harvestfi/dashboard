import React from 'react';
import { Button } from '@material-ui/core';

const HarvestButton = ({ size, children, onClick, ...otherProps }) => {
  return (
    <Button
      className="harvest-button"
      variant="contained"
      color="primary"
      size={size || 'large'}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default HarvestButton;
