import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar, Button, List, ListItem, ListItemAvatar , ListItemButton, ListItemText } from '@mui/material'
import "./Landing.css";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CardComponent from './Card';

const data = [
  {
    name: "Template1",
    photo: <QrCode2Icon />
  },
  {
    name: "Template1",
    photo: <QrCode2Icon />
  },
  {
    name: "Template1",
    photo: <QrCode2Icon />
  },
  {
    name: "Template1",
    photo: <QrCode2Icon />
  },
  {
    name: "Template1",
    photo: <QrCode2Icon />
  },
  {
    name: "Template1",
    photo: <QrCode2Icon />
  } 
]

function Landing() {
  return (
    <div className='footer-position'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-5 col-lg-5 " style={{ margin: 'auto 0' }}>
            <Typography className='landing-header' variant="h2" component="h1" >NFT Certificate</Typography>
            <Typography className='template-sub' variant="body1" component="p" color="initial">
              Builds the app for production to the build folder.
              It correctly bundles React in production mode and optimizes the build for the best performance.
            </Typography>

            <Button className='mt-4' variant='contained'>Get started</Button>
          </div>
          <div class="col-12   col-md-7 col-lg-7 ">
            <img src='/images/3.jpg' width="100%" alt='' />
          </div>
        </div>
      </div>
      <div className='container mt-5 mb-5 section2-bg-color text-center'>
        <div className='row'>
          <div className='col-6 mx-auto'>
            <Typography className='landing-header text-white' variant="h2" component="h2" >What is NFT Certificate?</Typography>
            <Typography className='template-sub text-white  m-2' variant="body1" component="p" color="initial">
              Builds the app for production to the build folder.
              It correctly bundles React in production mode and optimizes the build for the best performance.
            </Typography>
          </div>
        </div>
        <div className='row mt-4  '  >
          {
            data.map((value) => {
              return (
                <div key={value} className='col-12 col-md-4 col-lg-4 col-sm-6'>
                  <ListItem>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          {value.photo}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={value.name} className="text-white" />
                    </ListItemButton>
                  </ListItem>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='container mt-5 mb-5'>
        <div className='row'>
        <div className='col-8 mx-auto text-center'>
            <Typography className='landing-header' variant="h2" component="h2" >NFT Certificate for</Typography>
            <Typography className='template-sub  m-2' variant="body1" component="p" color="initial">
              Builds the app for production to the build folder.
              It correctly bundles React in production mode and optimizes the build for the best performance.
            </Typography>
          </div>
        </div>
        <div className='row mt-4  '  >
          {
            data.map((value,i) => { 
              return (
                <div key={i} className='col-12 col-md-4 col-lg-4 col-sm-6 p-3'>
                  <CardComponent/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Landing