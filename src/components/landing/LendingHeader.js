import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container"; 
import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function LendingHeader() {
  const navigate = useNavigate();  
  const [anchorElUser, setAnchorElUser] = React.useState(null); 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleNavigate = (e) => {
    navigate(`${e}`);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 

  return (
    <AppBar position="static" color="transparent">
      <Container sx={{ maxWidth: { md: 'lg', lg: 'xl', xl: 'xl', xxl: 'xxl' }, padding: { md: '0 4%', lg: '0 4%', xl: '0 4%', xxl: '0 4%' } }}>
        <Toolbar disableGutters>
          {/* <Logo /> */} Logo
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box> 

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Jaydip Patel" src="" />
                </IconButton>
              </Tooltip> 
               <Button variant='contained'  >
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
               <p className='text-dark m-0'> 0x9348...sdb3</p> 
              </MenuItem>
              <Divider/>
              <MenuItem  >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem    >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  );
}
