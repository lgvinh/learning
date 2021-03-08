const bravoSolveProblems = [
  {
    id: 1,
    tabName: 'Hire the wrong person',
    tabIcon: '/svg/achive/icon1.svg',
    tabActiveIcon: '/svg/achive/icon1-active.svg',
    contentTitle: 'No more re-hiring. Hire the right person today',
    content: 'With the use of advanced personal reflection tool based on the Holland (RIASEC) and Meyers Briggs (MBTI) tests, along with advanced matching algorithms, you will never hire the wrong person anymore (bravoTALENTS)',
    contentImg: '/svg/achive/solution-1.svg',
    contentClass: 'hiring'
  },
  {
    id: 2,
    tabName: 'Ineffective hiring process',
    tabIcon: '/svg/achive/icon2.svg',
    tabActiveIcon: '/svg/achive/icon2-active.svg',
    contentTitle: 'No more time wasting',
    content: 'bravoTALENTS provides a tool to digitalize and optimize the hiring process so that you can increase productivity without compromises.',
    contentImg: '/svg/achive/solution-2.svg',
    contentClass: 'process'
  },
  {
    id: 3,
    tabName: 'Data loss',
    tabIcon: '/svg/achive/icon3.svg',
    tabActiveIcon: '/svg/achive/icon3-active.svg',
    contentTitle: 'Protect your data',
    content: 'Keep your data safe with our centralize tool for gathering and managing hiring data. No more worry about losing access to valuable information, even when someone leaves the team.',
    contentImg: '/svg/achive/solution-3.svg',
    contentClass: 'data'
  },
  {
    id: 4,
    tabName: 'Low productivity',
    tabIcon: '/svg/achive/icon4.svg',
    tabActiveIcon: '/svg/achive/icon4-active.svg',
    contentTitle: 'Increase employee engagement to increase productivity',
    content: 'Happy employees bring greater results and enhance the company\'s culture and environment. bravoGROWTH helps you understand your employees and what they want and need. Through personal reflection tool, companies can then assert and adjust working environment to align their and their employees\' visions.',
    contentImg: '/svg/achive/solution-4.svg',
    contentClass: 'productivity'
  },
  {
    id: 5,
    tabName: 'Ineffective training courses',
    tabIcon: '/svg/achive/icon5.svg',
    tabActiveIcon: '/svg/achive/icon5-active.svg',
    contentTitle: 'Get suitable method',
    content: 'Customize your training courses through the use of personal reflection tool to provide the most knowledge and practices for your employees. Understand which kind of training benefits which type of your business in the long run.',
    contentImg: '/svg/achive/solution-5.svg',
    contentClass: 'training'
  }
];

const defaultSelectedCollapse = bravoSolveProblems[0].tabName;

const defaultSelectedTab = bravoSolveProblems[0].id;

export {
  bravoSolveProblems,
  defaultSelectedCollapse,
  defaultSelectedTab
};
