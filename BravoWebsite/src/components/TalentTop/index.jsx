import {
  Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/core';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';

/**
 * This component is for contents of talent pages including
 *
 * __How to use?__
 *
 * You put your array of url and index url inside of TalentTab like this
 * ```
 * <TalentTop
 *   data=[{
 *    index: 0,
 *    name: 'Hello World',
 *    url: '/talents'
 *    }]
 *   home={
 *    title: 'bravoTALENTS',
 *    url: '/talents',
 *    }
 * />
 * ```
 * @param {object} props
 * @param {{
 *  index: number,
 *  name: string,
 *  url: string
 * }[]} props.data
 * @param {{
 *  title: string,
 *  url: string,
 * }} props.home
 */

const TalentTop = ({ data, home, displaySolutionMobile }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const defaultItem = data.find((item) => item.url.includes(window.location.pathname));
    defaultItem ? setSelectedIndex(defaultItem.index) : navigate('/404');
  }, [data]);

  const mappedLink = useMemo(() => data.map((link) => link.isVisible && (
    <Link
      to={link.url[0]}
      key={link.index}
      className={`top-item-desktop ${selectedIndex === link.index ? 'top-selected-item-desktop' : ''}`}
    >
      {link.name}
    </Link>
  )), [data, selectedIndex]);

  return (
    <div className="top">
      <div className="top-container-desktop">
        <Link to={home.url} className="bravo-title-desktop">
          {home.title}
        </Link>
        {mappedLink}
      </div>
      <div className="top-container">
        <Link to={home.url} className="bravo-title">
          {home.title}
        </Link>
        <Menu autoSelect={false}>
          <MenuButton as="button" className="dropdown--solution">
            <span className="selected-solution">
              <span className={`solution ${!displaySolutionMobile ? 'hide' : ''}`}>Solution:</span>
              {data[selectedIndex].name}
              <span className="top-icon-arrow" />
            </span>
          </MenuButton>
          <MenuList className="menu-container" placement="bottom-start">
            {data.map((link) => (
              <Link
                to={link.url[0]}
                key={link.index}
              >
                <MenuItem
                  display={!link.isVisible && 'none'}
                  className={`menu-item ${selectedIndex === link.index && 'top-selected-item'}`}
                  onClick={() => setSelectedIndex(link.index)}
                >
                  <span
                    className={selectedIndex === link.index
                      ? 'top-selected-item-text'
                      : 'top-item-text'}
                  >
                    {link.name}
                  </span>
                </MenuItem>
              </Link>

            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

TalentTop.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  home: PropTypes.instanceOf(Object).isRequired,
  displaySolutionMobile: PropTypes.bool
};

TalentTop.defaultProps = {
  displaySolutionMobile: false
};

export default TalentTop;
