import React from 'react';
import {
  jobPostingAndDistributionContentList,
  jobPostingAndDistributionIntro
} from '../data/jobPostingAndDistributionContentList';
import Description from '../Description';
import Introduction from '../Introduction';

const JobPostingPages = () => (
  <>
    <Description
      descriptionTitle="The steps to getting your job postings to the right people"
      descriptionContent="Having a tough time looking for a great fit? Lacking candidates? Getting the perfect match for your job opening can be time consuming and tiring, especially if the talent pool is limited. But what if you can reach a much bigger audience?"
    />
    <div>
      <Introduction introContent={jobPostingAndDistributionIntro} />
    </div>
    {jobPostingAndDistributionContentList.map(
      (job) => <Introduction key={job.index} introContent={job} />
    )}

  </>
);

export default JobPostingPages;
