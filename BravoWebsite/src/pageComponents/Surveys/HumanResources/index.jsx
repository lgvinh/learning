import React from 'react';
import CopyRight from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import HeaderNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import SurveysTip from '../../../components/SurveysTip';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import TalentTop from '../../../components/TalentTop';
import { surveysHome, surveysUrlList } from '../../../data/talentsData/routeList';
import HRBottomContent from './components/HRBottomContent';
import HumanResourcesContent from './components/HRContent';
import MiddleContent from './components/MiddleContent';
import SurveyEmployees from './components/SurveyEmployees';
import WhatYouGet from './components/WhatYouGet';
import { intro, tip } from './data/data';

const HumanResourcesPage = () => (
  <div className="human-resources">
    <HelmetComponent title="Human Resources - BravoSURVEYS Platform" />
    <HeaderNavigation type="special" />
    <TalentTop home={surveysHome} data={surveysUrlList} />
    <TalentTab data={intro} className="background" contentType="surveys" />
    <WhatYouGet />
    <HumanResourcesContent />
    <section className="flex-column">
      <MiddleContent />
      <HRBottomContent />
    </section>
    <SurveyEmployees />
    <SurveysTip content={tip} className="hr-tip" marginBottom={100} />
    <TalentsRecruitment imgUrl="/svg/talents/surveys/bravo-surveys.svg" text="perfect survey for your business." />
    <footer>
      <Information />
      <CopyRight />
    </footer>
  </div>
);

export default HumanResourcesPage;