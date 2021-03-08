const bravoSuite = {
  isMostPopular: true,
  isShowContactUs: false,
  logo: '/svg/introduction/suite.svg',
  title: 'bravoSUITE',
  price: '3',
  unit: 'EMPLOYEES / MONTH',
  pricingPlanItem: [
    'Access to all apps including: bravoGROWTH, bravoTALENTS, bravoSURVEYS, bravoINSIGHTS',
    'Unlimited amount of candidates',
    'Unlimited users',
    'Unlimited survey’s responses for internal use',
    'Unlimited job posting to bravoTALENTS job board',
    '1 Free job posting per month to external job boards such as Vietnamworks, It Viec, Indeed….'
  ]
};

const bravoSurveys = {
  isMostPopular: false,
  isShowContactUs: true,
  logo: '/svg/logos/logo-surveys.svg',
  title: 'bravoSurveys',
  price: '1',
  unit: 'EMPLOYEES / MONTH',
  pricingPlanItem: [
    'Unlimited users',
    'Unlimited questions',
    'Unlimited responses',
    'All question types',
    'Email support'
  ]
};

const bravoTalents = {
  isMostPopular: false,
  isShowContactUs: false,
  logo: '/svg/logos/logo-talents.svg',
  title: 'bravoTalents',
  price: '1',
  unit: 'JOB POSTS / MONTH',
  pricingPlanItem: [
    'Unlimited amount of candidates',
    'Unlimited users',
    'Bulk import candidates',
    'Schedule interviews',
    'Display calendar and events',
    'Candidate profiling with RIASEC and MBTI',
    'Unlimited job postings on bravoTALENTS job board'
  ]
};

const bravoGrowth = {
  isMostPopular: false,
  isShowContactUs: false,
  logo: '/svg/logos/logo-growth.svg',
  title: 'bravoGrowth',
  price: '2',
  unit: 'EMPLOYEES / MONTH',
  pricingPlanItem: [
    'Candidate profiling with RIASEC and MBTI tests',
    'Team map to organize and form team based on profile',
    'Employee dashboard',
    'CV builder',
    'Personal coaching to utilized test results'
  ]
};

export const pricingItemList = [
  bravoSuite,
  bravoSurveys,
  bravoGrowth,
  bravoTalents
];
