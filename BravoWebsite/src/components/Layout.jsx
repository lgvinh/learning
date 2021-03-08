import { Box, Grid } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import '../assets/style.css';
import Menu from './Menu';

const Layout = ({ children }) => (
  <div>
    <Grid style={{ margin: '0 auto' }} maxW="90%" w={900} alignSelf="center">
      <Box mb={10} mt={20} />
      <Menu />

      <Box mb={100}>{children}</Box>
    </Grid>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired
};

export default Layout;
