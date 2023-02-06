import { Avatar, Button, Container, Divider, Grid, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Web3Context } from "../../../context/Web3Context";

import { useFormik, Form, FormikProvider } from "formik";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const NavOne = () => {
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, loginWithTrustified, disconnectWallet,
    update, shortAddress ,userId,data,getFirestoreData, aLoading} = web3Context;

  const navigate = useNavigate(); 
  const [sticky, setSticky] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user, setUser] = React.useState(""); 
  const [anchorElUser, setAnchorElUser] = React.useState(false); 
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      await connectWallet(values.name);
      setOpen(false);
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };


  const { handleSubmit } = formik;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };


  React.useEffect(() => {
    const user = window.localStorage.getItem("address");
    setUser(user);
    getFirestoreData();
  }, [update])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true)
    } else if (window.scrollY < 70) {
      setSticky(false)
    }
  };

  const mobileMenu = () => {
    setMenu(!menu);
  };

  const handleNavigate = (e) => {
    if(user != null){
      navigate(`${e}`); 
    }else{
      toast.error("Please Login!")
    }
  }
 
  return (
    <header className="site-header site-header__header-one">
      <nav
        className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${sticky ? "stricked-menu stricky-fixed" : ""
          }`}
      >
        <div className="container clearfix">
          <div className="logo-box clearfix">
            <a className="navbar-brand" onClick={() => handleNavigate('/')}>
              <img
                src="/images/logo.png"
                className="main-logo"
                width="119"
                alt="alter text"
              />
            </a>
            <button className="menu-toggler" onClick={mobileMenu}>
              <span className="fa fa-bars"></span>
            </button>
          </div>
          <div className="main-navigation" style={{ display: menu ? "block" : "none" }}>
            <ul className=" one-page-scroll-menu navigation-box">

              <li className="current scrollToLink" onClick={() => handleNavigate('/')}>
                <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>
              </li>
            </ul>
          </div>
          <div className="right-side-box">
            &nbsp;&nbsp;
            <a className="thm-btn header__cta-btn" onClick={() => handleNavigate('/dashboard/templates')}>
              <span>Create</span>
            </a>
            &nbsp;&nbsp;
            {
              user === null ? <a className="thm-btn header__cta-btn" onClick={handleOpen}>
                <span>Connect</span>
              </a> :
                <Tooltip title="">

                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Jaydip Patel" src={data ? data.Photo : ""} />
                  </IconButton>
                </Tooltip>
            }

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                {user != null && (
                  <p className="text-dark m-0">{shortAddress(user)}</p>
                )}
              </MenuItem>
              <Divider />
              {/* <MenuItem onClick={() => handleNavigate("/dashboard/profile")}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/dashboard/templates")}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem> */}
              <MenuItem onClick={disconnectWallet}>
                <a className="thm-btn header__cta-btn mx-auto" >
                  <span>Logout</span>
                </a>
              </MenuItem>
            </Menu>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Create Id
        </DialogTitle>

        <DialogContent style={{ overflowX: "hidden" }}>
          <Container maxWidth="sm">
            <form
              onSubmit={handleSubmit}
              style={{
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Enter name"
                  name="name"
                  id="name"
                  type="text"
                  required
                  {...formik.getFieldProps("name")}
                />
              </Stack>

              <DialogActions>
                <Grid container justifyContent="center">
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={aLoading}
                  >
                    {aLoading ? "Creating..." : "Create"}
                  </Button>
                </Grid>
              </DialogActions>
            </form>
          </Container>
        </DialogContent>
      </Dialog>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavOne;
