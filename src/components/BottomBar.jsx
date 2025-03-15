import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import UpIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import MoonIcon from '@mui/icons-material/WbSunny'
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/Timeline';
import CommitIcon from '@mui/icons-material/Settings';
import { themes } from '../themes/colorThemes';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar({setIsSlider, isSlider, isLeftOpen, settings, setsettings, setisLeftOpen,mode,setmode}) {
  return (
    <>
     
      <AppBar position="fixed" color="info"  sx={{ backgroundColor:mode?themes.light.background:themes.dark.background ,
        color:mode?themes.light.text:themes.dark.text,
        top: 'auto',maxHeight:"fit", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setisLeftOpen(!isLeftOpen)} aria-label="open drawer">
            <MenuIcon />
          </IconButton>
         <StyledFab onClick={() =>setIsSlider(!isSlider)} color={mode?'success':'error'} aria-label="Open">
            <UpIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => {
            setmode(!mode)
          }
          } color="inherit">
            <MoonIcon  />
          </IconButton>
          <IconButton onClick={()=>
            setsettings(!settings)} color="inherit">
            <CommitIcon  />
          </IconButton>
        </Toolbar>
      </AppBar>
  </>
  );
}
