import React from 'react';
import { contentList } from '../../data/data';
import HRContentItem from '../HRContentItem';

const HumanResourcesContent = () => (
  <>
    {contentList.map(
      (humanResourcesItem) => (
        <HRContentItem
          key={humanResourcesItem.index}
          contentItem={humanResourcesItem}
        />
      )
    )}
  </>
);

export default HumanResourcesContent;