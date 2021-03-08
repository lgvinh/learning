import React from 'react';
import Footer from '../../components/Footer/Copyright';
import TopNavigationBar from '../../components/HeaderNavigation';
import HelmetComponent from '../../components/Helmet';
import Description from './components/Description';
import PricingList from './components/PricingList';

const logo = '/svg/footer/footer_logo.svg';

const PricingPage = () => (
  <div className="pricing">
    <HelmetComponent title="BravoSUITE Pricing - Online HR Management Software" />
    <TopNavigationBar logo={logo} />
    <div className="pricing__wrapper">
      <div className="pricing__body">
        <Description />
        <PricingList />
      </div>
    </div>
    <Footer />
  </div>
);

export default PricingPage;
