import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop({open, setOpen}) {
  

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        // onClick={() => {
        //   setOpen(!open)
        // }
        // }
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
