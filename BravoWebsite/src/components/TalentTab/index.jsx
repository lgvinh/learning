import { CaretDownOutlined } from '@ant-design/icons';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs
} from '@chakra-ui/core';
import PropsTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

const tabProps = {
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  _focus: { boxShadow: 'none' },
  _selected: { backgroundColor: '#f2fafc', opacity: 1 },
  marginLeft: 1,
  opacity: 0.8,
  paddingTop: 3,
  border: 'none'
};

const tabListProps = {
  height: '100%'
};

/**
 * This component is for contents of talent pages including
 *
 * __How to use?__
 *
 * You put your array of tab component inside of TalentTab like this
 * ```
 * <TalentTab
 *   data={
 *    title: 'Hello world',
 *    content: 'You are my world'
 *   }
 *   tabs=[{
 *    id: 0,
 *    name: 'Hello World',
 *    component: <Component />
 *    }]
 *   className="background"
 * />
 * ```
 * @param {object} props
 * @param {{
 *  title: string,
 *  content: string
 * }} props.data
 * @param {{
 *  id: number,
 *  name: string,
 *  component: JSX.Element
 * }[]} props.tabs
 * @param {string} props.className
 * @param {string} props.id
 * @param {"talents" | "surveys"} props.contentType
 */

const TalentTab = ({
  data, tabs, className, id, contentType
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [root, page] = useMemo(() => {
    const { title } = data;
    const titleParts = title.split('|');

    return [
      titleParts[0],
      titleParts[1]
    ];
  }, [data]);

  return (
    <div id={id}>
      <section className={`talent-tab ${className}`}>
        <div className="talent-tab__content-container">
          <article>
            <h2 className="talent-tab__title-container">
              <span className="talent-tab__title">{root}</span>
              <span className="thin">|</span>
              <span className="talent-tab__title">{page}</span>
            </h2>
            <p className={`talent-tab__content-${contentType}`}>{data.content}</p>
          </article>
        </div>
        {tabs.length > 0
        && (
          <div className="talent-tab__tab">
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="enclosed">
              <TabList
                className="talent-tab__tab-list"
                {...tabListProps}
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    className="talent-tab__tab-title"
                    {...tabProps}
                  >
                    {tab.name}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </div>
        )}
      </section>
      {tabs.length > 0 && (
        <>
          <section className="dropdown--mobile">
            <Menu autoSelect={false}>
              <MenuButton as="button" className="dropdown--solution-mobile">
                <span className="dropdown--selected-solution-mobile">
                  {tabs[tabIndex].name}
                  <CaretDownOutlined className="dropdown--icon-mobile" twoToneColor="#20b4b3" />
                </span>
              </MenuButton>
              <MenuList className="menu-container" maxW="md">
                {
                  tabs.map((tab, index) => (
                    <MenuItem
                      key={tab.id}
                      onClick={() => setTabIndex(index)}
                      className={`tab-title ${index === tabIndex && 'tab-selected-menu'}`}
                    >
                      <span
                        className={index === tabIndex
                          ? 'tab-selected-menu-text'
                          : ''}
                      >
                        {tab.name}
                      </span>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </Menu>
          </section>
          <section>
            {tabs[tabIndex].component}
          </section>
        </>
      )}
    </div>
  );
};

TalentTab.defaultProps = {
  className: '',
  tabs: [],
  id: '',
  contentType: 'talents'
};

TalentTab.propTypes = {
  data: PropsTypes.instanceOf(Object).isRequired,
  tabs: PropsTypes.instanceOf(Array),
  className: PropsTypes.string,
  id: PropsTypes.string,
  contentType: PropsTypes.oneOf(['talents', 'surveys'])
};

export default TalentTab;
