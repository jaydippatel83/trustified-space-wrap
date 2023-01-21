import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom'; 
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useMediaQuery, useTheme } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const pages = [
  {
    name: 'Tamplates',
    path: '/dashboard/templates',

  },
  {
    name: 'Listing',
    path: '/dashboard/listing',
  },
  {
    name: 'Issuer',
    path: '/dashboard/issuer'
  },
  {
    name: 'Claim',
    path: '/dashboard/claim'
  }
];

function Header() {
  
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");

  const theme = useTheme();
  const smallToMid = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 240;

   


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleNavigate = (e) => {
    navigate(`${e}`);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));


  return (
    <AppBar position="static" color='transparent' open={open}>
      <div className='container'>
        {/* <div className='row'>
          <div className='col'> */}
        {/* <Container maxWidth="xl"> */}
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={()=>handleNavigate('/')}
          >
            LOGO
          </Typography>

          {
            smallToMid && <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              // display: { xs: 'block', sm: 'none' },
              onClick={handleDrawerOpen}
            >
              <MenuIcon />

            </IconButton>
          }

          <Drawer
            sx={{
              width: open && drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <img alt='' style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')} src='' />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {pages.map((text, index) => (
                <ListItem key={text.name} disablePadding>
                  <ListItemButton onClick={() => handleNavigate(text.path)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={()=>handleNavigate('/')}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page, i) => (
              <Typography
                key={i}
                textAlign="center"
                onClick={() => handleNavigate(page.path)}
                sx={{ my: 2, mx: 1, display: 'block', fontWeight: 600, color: '#5903ec' ,cursor:'pointer'}}
              >{page.name}</Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
             <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Jaydip Patel" src="" />
                </IconButton>
              </Tooltip>   <Button variant='contained'  >
                Connect
              </Button> 

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
              <MenuItem >
             <p className='text-dark m-0'> ss </p>
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => handleNavigate('/profile')}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem   >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default Header;