import React from 'react';
import CandidateProfile from '../components/CandidateProfile';
import Collaboration from '../components/Collaboration';
import HiringPipline from '../components/HiringPipline';
import InterviewKit from '../components/InterviewKit';
import OfferTracking from '../components/OfferTracking';
import ScheduleInterviews from '../components/ScheduleInterviews';

const topContent = {
  title: 'bravoTALENTS | HIRE',
  content: 'Recruitment should be a fairly easy and simple process. But in reality, it is not. Worry not, bravoTALENTS is here to relieve all your hiring troubles and difficulties. Hire the right talents effortlessly can never be easier, with our hiring-collaboration system, customized hiring pipelines, simple and thorough schedule structure and ofcourse, on-point profiling process support.'
};

const tabList = [
  {
    id: 0,
    name: 'Team Collaboration',
    component: <Collaboration />
  },
  {
    id: 1,
    name: 'Candidate Profiles',
    component: <CandidateProfile />
  },
  {
    id: 2,
    name: 'Customized Hiring Pipeline',
    component: <HiringPipline />
  },
  {
    id: 3,
    name: 'Schedule Interviews',
    component: <ScheduleInterviews />
  },
  {
    id: 4,
    name: 'Interview Kit And Scorecards',
    component: <InterviewKit />
  },
  {
    id: 5,
    name: 'Offer Tracking',
    component: <OfferTracking />
  }
];

export {
  topContent,
  tabList
};
