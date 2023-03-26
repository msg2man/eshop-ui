import React from 'react';
import {
  Grid,
  Paper
} from '@material-ui/core';
import HomeRounded from '@material-ui/icons/HomeRounded';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <HomeRounded className="home-icon" />
        </Grid>
      </Paper>
    </div>
  );
};

export default HomePage;
