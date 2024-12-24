// /home/belal/Desktop/Frontend/src/components/Navbar.jsx

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Map';

const pages = ['Globe', 'Portfolio', 'Blog'];
const settings = ['Github Profile', 'Account', 'Dashboard'];

function Navbar({isOpen, setSelectedEvent, setIsOpen}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ height: 'fit-content' }}>  {/* Added height: 'auto' here */}
      <Container maxWidth="xl">
        
        <Toolbar className='flex items-center w-full justify-between' disableGutters >
          <div className='flex items-center '>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />


          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display:'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            // onClick={() =>{ 
            //   setIsOpen(!isOpen);
            //   setSelectedEvent(null);
            // }}
            >
            Historia
          </Typography>
            </div>    
<div className='flex items-center gap-2'>
<Button
                onClick={() => {setIsOpen(!isOpen)
                  setSelectedEvent(null);
                }
              }
              sx={{ my: 2, color: 'white', bgcolor:'black' , display: 'block' }}
              >
                Random Events
                </Button>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              >
            </Menu>
            
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
           {/* <div className='flex items-center gap-6 justify-end w-full'> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
              
                </div>
                {/* </div> */}
            
              {/* <Box sx={{ flexGrow: 0 }}> */}
                  {/* <button type="button">Open</button> */}
                
                {/* {pages.map((page) => (
                  ))} */}
              {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
