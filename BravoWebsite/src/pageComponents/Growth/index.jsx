import React from 'react';
import HelmetComponent from '../../components/Helmet';
import BravoGrowth from './components/BravoGrowth';
import BuyNow from './components/BuyNow';
import Footer from './components/Footer';
import GrowthRecruitment from './components/GrowthRecruitment';
import Header from './components/Header';
import ReSkill from './components/ReSkill';
import SolveProblems from './components/SolveProblems';

export default () => (
  <>
    <HelmetComponent title="Growth Platform & Strategy - BravoGROWTH Platform" />
    <Header />
    <main
      id="growth"
    >
      <BuyNow />
      <BravoGrowth />
      <SolveProblems />
      <ReSkill />
      <GrowthRecruitment />
    </main>
    <Footer />
  </>
);
