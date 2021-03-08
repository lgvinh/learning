import React from 'react';
import Copyright from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import HeaderNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import Top from '../../../components/TalentTop';
import { home, talentUrlList } from '../../../data/talentsData/routeList';
import Communication from './components/Communication';
import HowWeWork from './components/HowWeWork';
import Introduction from './components/Introduction';

const topContent = {
  title: 'bravoTALENTS | ENGAGE',
  content: 'Engage with your candidates for the best possible recruitment result. Strike insightful conversations with even the most passive candidate. bravoTALENTS helps you nurture relationships and manage all your communications, so you can be proactive with your hiring process and connected with the talent pool.'
};

const Engage = () => (
  <div className="talents-engage">
    <HelmetComponent title="Engage - BravoTALENTS Platform" />
    <HeaderNavigation type="special" />
    <Top
      data={talentUrlList}
      home={home}
      displaySolutionMobile
    />
    <TalentTab
      data={topContent}
      className="background"
    />
    <Introduction />
    <HowWeWork />
    <Communication />
    <TalentsRecruitment
      imgUrl="/svg/talents/recruitment/bravo-talents.svg"
      text="recruitment done right"
    />
    <footer>
      <Information />
      <Copyright />
    </footer>
  </div>
);

export default Engage;
