const bravoTabs = [
  {
    id: 1,
    name: 'bravo growth',
    image: '/images/growth.webp',
    tabLogo: '/svg/logos/logo-growth.svg',
    title: 'Self-Reflection Tool for Your Business',
    description: 'Using advanced technologies and certified global tests, your employees can test themselves to see if they are fitted for the job and what motivates them in their career',
    link: '/growth',
    bg: 'growth',
    whiteLogo: '/svg/logos/white-growth.svg',
    isShowButton: true
  },
  {
    id: 2,
    name: 'bravo talent',
    image: '/images/webp/talent.webp',
    tabLogo: '/svg/logos/logo-talents.svg',
    title: 'Engage with your talent',
    description: 'From job-listing to recruitment, bravoTALENTS creates a smooth and flawless hiring procedure to ease off all your recruiting stress.',
    link: '/talents',
    bg: 'talent',
    whiteLogo: '/svg/logos/white-talents.svg',
    isShowButton: true
  },
  {
    id: 3,
    name: 'bravo survey',
    image: '/images/survey.webp',
    tabLogo: '/svg/logos/logo-surveys.svg',
    title: 'Easy surveys',
    description: 'With our beautiful Look & Feel and clean UI for ease of use, useful surveys are created within a few clicks. Surveys can then be converted into useful dashboards and reports through bravoINSIGHTS.',
    link: '/surveys',
    bg: 'survey',
    whiteLogo: '/svg/logos/white-surveys.svg',
    isShowButton: true
  },
  {
    id: 4,
    name: 'bravo insights',
    image: '/images/insight.webp',
    tabLogo: '/svg/logos/logo-insight.svg',
    title: 'Deep Insights for Decision Making',
    description: 'From employee engagement to market research - get insights for your business decisions through meaningful and beautiful dashboards.',
    link: '',
    bg: 'insight',
    whiteLogo: '/svg/logos/white-insights.svg',
    isShowButton: false
  }
];

const defaultSelectedTab = bravoTabs[0].name;

export {
  bravoTabs,
  defaultSelectedTab
};
