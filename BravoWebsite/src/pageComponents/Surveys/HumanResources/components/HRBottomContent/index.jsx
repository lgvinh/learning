import React from 'react';
import { bottomContentList } from '../../data/data';
import HRContentItem from '../HRContentItem';

const HumanResourcesBottomContent = () => (
  <>
    {bottomContentList.map(
      (humanResourcesItem) => (
        <HRContentItem
          key={humanResourcesItem.index}
          contentItem={humanResourcesItem}
        />
      )
    )}
  </>
);

export default HumanResourcesBottomContent;