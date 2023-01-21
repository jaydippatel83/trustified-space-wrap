import { Avatar, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';

const CardComponent = () => {
    return (
        <Card sx={{ minWidth: 275, textAlign: 'center', p: 2 }}>
            <CardContent >
                <Stack direction="row" spacing={2} sx={{justifyContent:'center'}}>
                    <Avatar  sx={{width:'80px',height:'80px'}} />
                </Stack>
                <Typography variant="h5" component="div">
                    be nev o lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent> 
        </Card>
    )
}

export default CardComponent;