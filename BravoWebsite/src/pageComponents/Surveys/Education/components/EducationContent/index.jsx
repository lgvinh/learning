import React from 'react';
import { educationContentList } from '../data/data';
import EducationContentItem from '../EducationContentItem';

const EducationContent = () => (
  <>
    {educationContentList.map(
      (educationItem) => (
        <EducationContentItem
          key={educationItem.index}
          contentItem={educationItem}
        />
      )
    )}
  </>
);

export default EducationContent;