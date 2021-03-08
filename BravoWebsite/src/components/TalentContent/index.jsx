import propType from 'prop-types';
import React, { createElement, useMemo } from 'react';
import { MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT } from '../../config/constant';

/**
 * This component is for contents of talent pages including
 * vertical or horizontal type
 *
 * __How to use?__
 *
 * You put yor html code inside of TalentConentComponent like this
 * ```
 * <TalentContent
 *   type="horizontal"
 *   row="reverse"
 *   background="lightBlue"
 *   id="communication"
 * >
 *    <div>
 *      {'...Text that wrappered in div tag(Text only)'}
 *    </div>
 *    <figure>
 *      <img />  {'img tag must be wrappered in figure tag'}
 *    </figure>
 * </TalentContent>
 * ```
 * @param {object} props
 * @param {'horizontal' | 'vertical'} props.type
 * @param {'normal' | 'reverse'} props.row
 * @param {'lightBlue' | 'white'} props.background
 * @param {string} props.className
 * @param {string} props.id
 * @param {JSX.Element | JSX.Element[]} props.children
 *
 */
const TalentContent = ({
  type,
  row,
  background,
  className,
  id,
  children
}) => {
  const talentContentChildren = useMemo(() => children.map((talentContent) => {
    const {
      children: talentContentElementChildrenProperty,
      ...talentContentElementProperties
    } = talentContent.props;

    const talentContentElement = createElement(
      talentContent.type,
      { ...talentContentElementProperties },
      talentContentElementChildrenProperty
    );

    return (
      <div
        key={talentContent.type}
        className={`${MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT.CONTENT[talentContent?.type]} ${MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT.WRAPPER[type]}`}
      >
        {talentContentElement}
      </div>
    );
  }), [children, type]);

  return (
    <div
      className={`talent-container ${MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT.BG[background]}`}
    >
      <div
        className={
          `talent-content ${MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT.CONTENT[type]} ${MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT.ROW[row]} ${className}`
        }
        id={id}
      >
        {talentContentChildren}
      </div>
    </div>
  );
};

TalentContent.defaultProps = {
  className: '',
  id: '',
  row: 'normal',
  type: 'horizontal',
  background: 'white'
};

TalentContent.propTypes = {
  type: propType.oneOf(['horizontal', 'vertical']),
  row: propType.oneOf(['normal', 'reverse']),
  background: propType.oneOf(['lightBlue', 'white']),
  className: propType.string,
  id: propType.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: propType.any.isRequired
};

export default TalentContent;
