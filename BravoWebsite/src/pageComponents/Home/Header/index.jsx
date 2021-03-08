import React from 'react';
import HeaderContent from './components/HeaderContent';
import TopNavigationBar from './components/TopNavigation';

const Header = () => (
  <>
    <header className="header">
      <TopNavigationBar logo="/svg/footer/footer_logo.svg" />
      <div
        className="header--content"
      >
        <HeaderContent />
      </div>
    </header>
  </>
);

export default Header;
