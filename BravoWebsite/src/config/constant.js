const TALENT_COMPONENT_WRAPPER_TYPE = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

const TALENT_COMPONENT_PROPERTY_TYPE = {
  DIV: 'div',
  SECTION: 'section',
  ARTICLE: 'article',
  FIGURE: 'figure',
  BG: {
    LIGHT_BLUE: 'lightBlue',
    WHITE: 'white'
  },
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  REVERSE: 'reverse',
  NORMAL: 'normal'
};

const MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT = {
  WRAPPER: {
    [TALENT_COMPONENT_WRAPPER_TYPE.VERTICAL]: 'talent-content--verticalize',
    [TALENT_COMPONENT_WRAPPER_TYPE.HORIZONTAL]: 'talent-content--horizontalize'
  },
  BG: {
    [TALENT_COMPONENT_PROPERTY_TYPE.BG.LIGHT_BLUE]: 'bg-light-blue',
    [TALENT_COMPONENT_PROPERTY_TYPE.BG.WHITE]: 'bg-white'
  },
  CONTENT: {
    [TALENT_COMPONENT_PROPERTY_TYPE.VERTICAL]: 'talent-content-vertical',
    [TALENT_COMPONENT_PROPERTY_TYPE.HORIZONTAL]: 'talent-content-horizontal',
    [TALENT_COMPONENT_PROPERTY_TYPE.DIV]: 'talent-content--text',
    [TALENT_COMPONENT_PROPERTY_TYPE.SECTION]: 'talent-content--text',
    [TALENT_COMPONENT_PROPERTY_TYPE.ARTICLE]: 'talent-content--text',
    [TALENT_COMPONENT_PROPERTY_TYPE.FIGURE]: 'talent-content--image'
  },
  ROW: {
    [TALENT_COMPONENT_PROPERTY_TYPE.REVERSE]: 'talent-content-reverse',
    [TALENT_COMPONENT_PROPERTY_TYPE.NORMAL]: 'talent-content-normal'
  }
};

const HEADER_NAVIGATION_PROPERTIES = {
  NORMAL: 'normal',
  SPECIAL: 'special'
};

const MAPPING_CLASS_NAME_FOR_HEADER_NAVIGATION = {
  [HEADER_NAVIGATION_PROPERTIES.NORMAL]: 'header__nav-bar--wrapper--normal',
  [HEADER_NAVIGATION_PROPERTIES.SPECIAL]: 'header__nav-bar--wrapper--special'
};

const API_RESPONSE_STATUS = {
  DEFAULT: 0,
  SUCCESS: 1,
  FAIL: 2
};

const BUTTON_CHANGE_TAB_TYPE = {
  NEXT: 'next',
  PREVIOUS: 'previous'
};

const IMAGE_TYPE = {
  PNG: 'png',
  SVG: 'svg',
  JPEG: 'jpeg',
  WEBP: 'webp'
};

const MIME_TYPE = {
  PNG: 'image/png',
  SVG: 'image/svg+xml',
  JPEG: 'image/jpeg',
  WEBP: 'image/webp'
};

export {
  TALENT_COMPONENT_WRAPPER_TYPE,
  TALENT_COMPONENT_PROPERTY_TYPE,
  MAPPING_CLASS_NAME_FOR_TALENT_COMPONENT,
  MAPPING_CLASS_NAME_FOR_HEADER_NAVIGATION,
  API_RESPONSE_STATUS,
  BUTTON_CHANGE_TAB_TYPE,
  IMAGE_TYPE,
  MIME_TYPE
};
