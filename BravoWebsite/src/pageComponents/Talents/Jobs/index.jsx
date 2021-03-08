import React from 'react';
import CopyRight from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import TopNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import Top from '../../../components/TalentTop';
import { home, talentUrlList } from '../../../data/talentsData/routeList';
import { tabList, topContent } from './components/data/tabContentList';

const JobsPage = () => (
  <div className="product-talent-job">
    <HelmetComponent title="Jobs - BravoTALENTS Platform" />
    <TopNavigation type="special" />
    <Top
      data={talentUrlList}
      home={home}
      displaySolutionMobile
    />
    <TalentTab
      data={topContent}
      tabs={tabList}
      className="background"
    />
    <TalentsRecruitment imgUrl="/svg/talents/recruitment/bravo-talents.svg" text="RECRUITMENT DONE RIGHT" />
    <Information />
    <CopyRight />
  </div>
);

export default JobsPage;
