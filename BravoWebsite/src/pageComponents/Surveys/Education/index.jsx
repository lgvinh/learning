import React from 'react';
import CopyRight from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import TopNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import SurveysTip from '../../../components/SurveysTip';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import TalentTop from '../../../components/TalentTop';
import { surveysHome, surveysUrlList } from '../../../data/talentsData/routeList';
import { educationIntro, educationTip } from './components/data/data';
import EducationContent from './components/EducationContent';
import Intro from './components/Intro';

const EducationPage = () => (
  <div className="surveys-education">
    <HelmetComponent title="Education - BravoSURVEYS Platform" />
    <TopNavigation type="special" />
    <TalentTop data={surveysUrlList} home={surveysHome} />
    <TalentTab data={educationIntro} className="background" contentType="surveys" />
    <Intro />
    <EducationContent />
    <SurveysTip content={educationTip} marginBottom={100} />
    <TalentsRecruitment imgUrl="/svg/talents/surveys/bravo-surveys.svg" text="perfect survey for your business." />
    <footer>
      <Information />
      <CopyRight />
    </footer>
  </div>
);

export default EducationPage;