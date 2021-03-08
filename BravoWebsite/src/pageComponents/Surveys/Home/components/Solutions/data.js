const imgUrlGenerator = (imgName) => `/images/surveys/home/${imgName}.png`;

export const solutions = [
  {
    title: 'Education',
    content: 'How do you create a perfect learning environment? Gathering Feedback, Training Evaluation, Course Evaluation, Suggestion, Satisfaction Measure, everything related to a school’s Education system can be collected using our Education Survey system.',
    img: imgUrlGenerator('education'),
    url: '/surveys/education'
  },
  {
    title: 'Market Research',
    content: 'Is your company going on the right path? Having the right approach? How do you fare against competitors? Our surveys help you grow your audience and update you with the newest market trends to assure your success.',
    img: imgUrlGenerator('market-research'),
    url: '/surveys/market-research'
  },
  {
    title: 'Human Resources',
    content: 'Are your employees motivated enough? Get insights about employee engagement with our strategic Human Resource surveys. Improve communication. Collect feedback. Discover potential.',
    img: imgUrlGenerator('human-resources'),
    url: '/surveys/human-resources'
  },
  {
    title: 'Customer Experience',
    content: 'How do you measure your service quality? Are your customer service teams working as intended? Measure your Customer Satisfaction (CSAT), Customer Effort Score (CES), and Net Promoter Score (NPS) to help your companies deliver first-class services.',
    img: imgUrlGenerator('customer-experience'),
    url: '/surveys/customer-experience'
  }
];
