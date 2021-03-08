import React, { useMemo } from 'react';
import { pricingItemList } from '../data/pricingItemList';
import PricingItem from '../PricingItem';

const PricingList = () => {
  const pricingList = useMemo(() => pricingItemList.map((pricingItem) => (
    <PricingItem key={pricingItem.title} pricingItem={pricingItem} />
  )), []);

  return (
    <div className="pricing__list-item">
      {pricingList}
    </div>
  );
};

export default PricingList;
