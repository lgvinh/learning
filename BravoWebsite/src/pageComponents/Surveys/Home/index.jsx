import React from 'react';
import HelmetComponent from '../../../components/Helmet';
import TalentTop from '../../../components/TalentTop';
import { surveysHome, surveysUrlList } from '../../../data/talentsData/routeList';
import Addressing from './components/Addressing';
import Banner from './components/Banner';
import BeautifulDesign from './components/BeautifulDesign';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import PowerfulInsight from './components/PowerfulInsight';
import Simple from './components/Simple';
import Solutions from './components/Solutions';
import SurveyRecruitment from './components/SurveyRecruitment';

const Survey = () => (
  <>
    <HelmetComponent title="Best Survey Platform - BravoSURVEYS Platform" />
    <Header />
    <main id="survey-home">
      <TalentTop
        data={surveysUrlList}
        home={surveysHome}
        displaySolutionMobile
      />
      <Banner />
      <Simple />
      <BeautifulDesign />
      <PowerfulInsight />
      <Addressing />
      <Features />
      <Solutions />
      <SurveyRecruitment />
    </main>
    <Footer />
  </>
);

export default Survey;
