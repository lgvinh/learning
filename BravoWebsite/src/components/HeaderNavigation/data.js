const navigationItems = [
  {
    name: 'Products',
    link: null,
    children: [
      {
        name: 'bravoTALENTS',
        link: '/talents'
      },
      {
        name: 'bravoSURVEYS',
        link: '/surveys'
      },
      {
        name: 'bravoGROWTH',
        link: '/growth'
      }
      // {
      //   name: 'bravoINSIGHTS',
      //   update later
      //   link: '/'
      // }
    ]
  },
  {
    name: 'Pricing',
    link: '/pricing'
  },
  {
    name: 'Contact',
    link: '/contact-us'
  }
  // {
  // name: 'Resources',
  // update later
  // link: '/'
  // }
  // {
  //   name: 'Blog',
  //   link: '/blog'
  // }
];

export {
  navigationItems
};
