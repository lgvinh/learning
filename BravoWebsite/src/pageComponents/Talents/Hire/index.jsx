import React from 'react';
import HelmetComponent from '../../../components/Helmet';
import TalentTab from '../../../components/TalentTab';
import TalentTop from '../../../components/TalentTop';
import { home, talentUrlList } from '../../../data/talentsData/routeList';
import Footer from './components/Footer';
import Header from './components/Header';
import HireRecruitment from './components/HireRecruitment';
import { tabList, topContent } from './data';

const Hire = () => (
  <>
    <HelmetComponent title="Hire - BravoTALENTS Platform" />
    <Header />
    <main
      id="talents-hire"
    >
      <TalentTop
        data={talentUrlList}
        home={home}
        displaySolutionMobile
      />
      <TalentTab
        data={topContent}
        tabs={tabList}
        className="talents-hire--tab-background"
      />
      <HireRecruitment />
    </main>
    <Footer />
  </>
);

export default Hire;
