import React from 'react';
import HelmetComponent from '../../components/Helmet';
import Footer from './Footer';
import Header from './Header';
import Introduction from './Introduction';
import HorizontalTab from './Tabs/HorizontalTab';
import VerticalTab from './Tabs/VerticalTab';

const Tabs = () => (
  <>
    <HelmetComponent
      title="Human Resources Platform (HR Platform) - BravoSUITE"
      description="The Tool That Brings You The Ultimate Business Experience - BravoSUITE"
      image={{
        src: '/images/thumbnails/bravo-thumbnail.png',
        width: 720,
        height: 300
      }}
    />
    <Header />
    <main>
      <Introduction />
      <HorizontalTab />
      <VerticalTab />
    </main>
    <Footer />
  </>
);

export default Tabs;
