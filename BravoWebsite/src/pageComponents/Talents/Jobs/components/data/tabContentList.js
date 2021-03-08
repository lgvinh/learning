import React from 'react';
import Career from '../CareerPages';
import JobPostingPages from '../JobPostingAndDistribution';

export const topContent = {
  title: 'bravoTALENTS | JOBS',
  content: 'We understand that every job is unique, and we are here to make sure that your job posting not only gets all the attention it needs, but also showcases to potential candidates in details the exact requirements and the type of employees that you are looking for. bravoTALENTS helps you make recruiting easy, and finding the perfect candidate easier.'
};

export const tabList = [
  {
    id: 0,
    name: 'Career Pages',
    component: <Career />
  },
  {
    id: 1,
    name: 'Job posting and distribution',
    component: <JobPostingPages />
  }
];