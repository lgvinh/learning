const imgUrlGenerator = (imgName) => `/images/surveys/home/${imgName}.png`;

export const featureItems = [
  {
    name: 'Custom Branding',
    img: imgUrlGenerator('customBranding')
  },
  {
    name: 'Mobile Optimized',
    img: imgUrlGenerator('mobile')
  },
  {
    name: 'Advanced Survey Logic ',
    img: imgUrlGenerator('surveyLogic')
  },
  {
    name: 'Email Scheduling & Tracking',
    img: imgUrlGenerator('emailTracking')
  },
  {
    name: 'Reporting & Exporting',
    img: imgUrlGenerator('reporting')
  },
  {
    name: 'Teams and User Roles',
    img: imgUrlGenerator('team')
  },
  {
    name: 'Automation & Integration',
    img: imgUrlGenerator('automation')
  },
  {
    name: 'State of the Art Security',
    img: imgUrlGenerator('security')
  }
];
