import React from 'react';
import HeaderNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTop from '../../../components/TalentTop';
import { home, talentUrlList } from '../../../data/talentsData/routeList';
import Banner from './Banner';
import Empower from './Empower';
import Footer from './Footer';
import HowWeWork from './HowWeWork';
import Introduction from './Introduction';
import Workforce from './Workforce';

const Solution = () => (
  <div className="talents-solution">
    <HelmetComponent title="Global Talent HR Solutions - BravoTALENTS Platform" />
    <HeaderNavigation
      type="special"
    />
    <TalentTop
      data={talentUrlList}
      home={home}
      displaySolutionMobile
    />
    <Banner />
    <Introduction />
    <HowWeWork />
    <Workforce />
    <Empower />
    <TalentsRecruitment
      imgUrl="/svg/talents/recruitment/bravo-talents.svg"
      text="recruitment done right"
    />
    <Footer />
  </div>
);

export default Solution;
