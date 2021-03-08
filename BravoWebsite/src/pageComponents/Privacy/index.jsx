import React from 'react';
import HeaderNavigation from '../../components/HeaderNavigation';
import HelmetComponent from '../../components/Helmet';
import Footer from './components/Footer';
import Policy from './components/Policy';

const Privacy = () => (
  <>
    <HelmetComponent title="Privacy policy - BravoSUITE" />
    <HeaderNavigation
      type="special"
    />
    <Policy />
    <Footer />
  </>
);

export default Privacy;