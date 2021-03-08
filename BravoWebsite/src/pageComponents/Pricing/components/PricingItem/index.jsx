import {
  TabPanel, TabPanels, Tabs
} from '@chakra-ui/core';
import { Input } from 'antd';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanItem from '../PlanItem';

const PricingItem = ({ pricingItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(pricingItem.price);

  const handleChange = (e) => {
    const { value } = e.target;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value) || !value) {
      setQuantity(1);
    } else if (value >= 1 && value <= 1000000) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    pricingItem.unit && setPrice(quantity * pricingItem.price);
  }, [pricingItem.price, pricingItem.unit, quantity]);

  return (
    <div className="pricing__item-container">
      <Tabs isFitted variant="enclosed">
        <TabPanels>
          <TabPanel>
            <div className="pricing__content-group">
              {pricingItem.isMostPopular && <img className="pricing__most-popular" src="/images/pricing/most-popular.png" alt="most popular" />}
              <img className="pricing-item__logo" src={pricingItem.logo} alt={pricingItem.title} />
              <span className="pricing-item__price">
                $
                {price}
              </span>
              <div className="pricing-item__input-group">
                <Input
                  className="pricing-item__input"
                  aria-label="pricing-item__input"
                  onChange={handleChange}
                  value={quantity}
                  min={1}
                  max={1000000}
                />
                <span className="pricing-item__employee">{pricingItem.unit}</span>
              </div>
              <button
                type="button"
                className="pricing-item__get-started"
              >
                <Link
                  to="/contact-us"
                  state={{
                    plan: pricingItem.title,
                    quantity,
                    unit: pricingItem.unit
                  }}
                >
                  CONTACT US
                </Link>
              </button>
              <hr />
              {pricingItem.isShowContactUs && (
                <section className="pricing-item__contact-us">
                  If you want to survey external people,
                  {' '}
                  <Link to="/contact-us" className="pricing-item__link">Contact us</Link>
                </section>
              )}
              <div className={isExpanded ? 'pricing-item__info-group-expand' : 'pricing-item__info-group'}>
                <span className="pricing-item__plan-include">Plan includes:</span>
                {pricingItem.pricingPlanItem.map(
                  (planItem) => (
                    <PlanItem key={planItem} planItemText={planItem} />
                  )
                )}
              </div>
              <div className={isExpanded ? '' : 'pricing-item__blur-plan-item'} />
              <button
                type="button"
                aria-label="pricing-item__expand-icon"
                className="pricing-item__expand-icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <i className={`pricing-item__rotate ${isExpanded ? 'pricing-item__rotate-icon-expanded' : 'pricing-item__rotate-icon'}`} />
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

PricingItem.propTypes = {
  pricingItem: PropTypes.instanceOf(Object).isRequired
};

export default PricingItem;
