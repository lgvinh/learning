import React from 'react';
import Copyright from '../../../components/Footer/Copyright';
import Information from '../../../components/Footer/Information';
import HeaderNavigation from '../../../components/HeaderNavigation';
import HelmetComponent from '../../../components/Helmet';
import TalentsRecruitment from '../../../components/TalentsRecruitment';
import TalentTab from '../../../components/TalentTab';
import TalentTop from '../../../components/TalentTop';
import { surveysHome, surveysUrlList } from '../../../data/talentsData/routeList';
import Essential from './components/Essential';
import Example from './components/Example';
import HowWeWork from './components/HowWeWork';

const topContent = {
  title: 'bravoSURVEYS | MARKET RESEARCH',
  content: 'Run your market research in minutes. Your way. Influence your business. Discover market trends through respondents’ behavior, attitudes, values and opinions to reason your strategy.'
};

export default () => (
  <div className="market-research">
    <HelmetComponent title="Market Research - BravoSURVEYS Platform" />
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
    <HowWeWork />
    <Essential />
    <Example />
    <TalentsRecruitment
      imgUrl="/svg/talents/recruitment/bravo-surveys.svg"
      text="perfect survey for your business."
    />
    <footer>
      <Information />
      <Copyright />
    </footer>
  </div>
);