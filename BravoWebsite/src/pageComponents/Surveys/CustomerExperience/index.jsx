import React from 'react';
import Copyright from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import HeaderNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import TalentTop from '../../../components/TalentTop';
import { surveysHome, surveysUrlList } from '../../../data/talentsData/routeList';
import Solution from './components/Solution';
import WhatWeWork from './components/WhatWeWork';

const topContent = {
  title: 'bravoSURVEYS | CUSTOMER EXPERIENCE',
  content: 'How strong is your service? How likely will your customers recommend you to other people? Was the process done smoothly and easily? Listening to your customers can bring you the best kind of success.'
};

export default () => (
  <div className="customer-experience">
    <HelmetComponent title="Customer Experience - BravoSURVEYS Platform" />
    <HeaderNavigation type="special" />
    <TalentTop
      data={surveysUrlList}
      home={surveysHome}
    />
    <TalentTab
      data={topContent}
      className="background"
      contentType="surveys"
    />
    <WhatWeWork />
    <Solution />
    <TalentsRecruitment
      imgUrl="/svg/surveys/bravo-surveys.svg"
      text="perfect survey for your business."
    />
    <footer>
      <Information />
      <Copyright />
    </footer>
  </div>
);
