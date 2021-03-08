import { Link } from 'gatsby';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import propType from 'prop-types';
import { navigationItems } from './data';
import { MAPPING_CLASS_NAME_FOR_HEADER_NAVIGATION } from '../../config/constant';
import { getParentPath } from '../../utils/get-url-path';

/**
 *
 * @param {object} props
 * @param {"normal" | "special"} props.type
 */
const HeaderNavigation = ({
  type
}) => {
  const headerNavBar = useRef(null);
  const hambugerMenu = useRef(null);
  const hambugerSubMenu = useRef(null);
  const [currPath, setCurrPath] = useState({});
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const ticking = useRef(null);

  const replaceClassNameHandler = useCallback((
    ref,
    additionClassName,
    removalClassName,
    continuous = false
  ) => {
    if (ref && ref.current) {
      const { classList } = ref.current;
      if (!continuous) {
        if (classList.value.includes(removalClassName)) {
          classList.remove(removalClassName);
        } else {
          classList.add(additionClassName);
        }
      } else if (!classList.value.includes(removalClassName)) {
        classList.add(additionClassName);
      } else {
        classList.remove(removalClassName);
        classList.add(additionClassName);
      }
    }
  }, []);

  const animationHeaderHandler = useCallback(() => {
    if (headerNavBar && headerNavBar.current) {
      const { classList } = headerNavBar?.current;

      if (window.scrollY < 95) {
        // init
        classList.remove('scrolledUp', 'scrolledDown');
      } else if (window.scrollY < lastScrollPosition) {
        // Scroll up
        replaceClassNameHandler(headerNavBar, 'scrolledUp', 'scrolledDown', true);
      } else {
        // Scroll down
        replaceClassNameHandler(headerNavBar, 'scrolledDown', 'scrolledUp', true);
      }
      classList.remove('active');
      ticking.current = false;
    }
  }, [lastScrollPosition, replaceClassNameHandler]);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(animationHeaderHandler);
    }
    ticking.current = true;
  }, [animationHeaderHandler]);

  const handleOnScroll = useCallback(() => {
    requestTick();
    setLastScrollPosition(window.scrollY);
  }, [requestTick]);

  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [handleOnScroll]);

  const navigationMenuItems = useMemo(() => navigationItems.map((navigationMenuItem) => {
    const currentPath = currPath;
    if (navigationMenuItem.link) {
      return (
        <Link
          className={navigationMenuItem.link === currentPath
            ? 'header__link header__link--active'
            : 'header__link'}
          to={navigationMenuItem.link}
          key={navigationMenuItem.name}
        >
          {navigationMenuItem.name}
        </Link>
      );
    }
    const menuItems = navigationMenuItem.children.map((menuItem) => (
      <li
        key={menuItem.link}
        className={menuItem.link === currentPath
          || menuItem.link === getParentPath(currentPath)
          ? 'header__link--sub-menu--item header__link--sub-menu--item--active'
          : 'header__link--sub-menu--item'}
      >
        <Link to={menuItem.link}>{menuItem.name}</Link>
      </li>
    ));
    const menu = (
      <ul className="header__link--sub-menu__container">
        {menuItems}
      </ul>
    );
    return (
      <div
        className="header__link header__link--sub-menu"
        key={navigationMenuItem.name}
      >
        <p
          className="header__link--have-sub"
        >
          {navigationMenuItem.name}
        </p>
        {menu}
      </div>
    );
  }), [currPath]);

  const subMenuItems = useMemo(() => navigationItems.map((subMenuItem) => {
    if (subMenuItem.link) {
      return (
        <li
          className="header__hambuger-list--item"
          key={subMenuItem.name}
        >
          <Link to={subMenuItem.link}>
            {subMenuItem.name}
          </Link>
        </li>
      );
    }
    return (
      <li
        className="header__hambuger-list--item header__hambuger-list--item--have-submenu"
        ref={hambugerSubMenu}
        onClick={() => {
          replaceClassNameHandler(hambugerSubMenu, 'active', 'active');
        }}
        key={subMenuItem.name}
      >
        <p
          className="header__link--have-sub--black"
        >
          {subMenuItem.name}
        </p>
        <ul
          className="header__sub-menu"
        >
          {
            subMenuItem.children.map((subMenuItemChildren) => (
              <li
                className="header__sub-menu--item"
                key={subMenuItemChildren.name}
              >
                <Link to={subMenuItemChildren.link}>
                  {subMenuItemChildren.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </li>
    );
  }), [replaceClassNameHandler]);

  return (
    <div
      className={`header__nav-bar--wrapper ${MAPPING_CLASS_NAME_FOR_HEADER_NAVIGATION[type]}`}
      ref={headerNavBar}
    >
      <div
        className="header__nav-bar"
      >
        <div
          className="header__nav-bar--left"
        >
          <Link className="header__title" to="/">
            {
              type === 'special'
                ? <img src="/svg/logo.svg" alt="logo" className="header__logo header__logo--desktop" />
                : <img src="/svg/header/logo_white.svg" alt="logo" className="header__logo header__logo--desktop" />
            }
            <img src="/svg/logo.svg" alt="logo" className="header__logo header__logo--mobile" />
          </Link>
          <nav className="header__nav-bar--left__nav">
            {navigationMenuItems}
          </nav>
        </div>
        <nav className="header__nav-bar--right sign-in--link">
          <Link
            className="header__link"
            to="https://accounts.bravosuite.io/"
            target="__blank"
          >
            Sign in
          </Link>
          <Link to="/pricing" className="header__try-free-btn">
            Get Started
          </Link>
        </nav>
        <div
          className="header__hamburger-menu--wrapper"
        >
          <div
            className="header__hamburger-menu"
          >
            <span
              className="header__hambuger-icon"
              ref={hambugerMenu}
              onClick={() => {
                replaceClassNameHandler(headerNavBar, 'active', 'active');
              }}
            />
            <ul
              className="header__hambuger-list"
            >
              {subMenuItems}
              <li className="sign-in--btn">
                <Link
                  to="https://accounts.bravosuite.io/"
                  target="__blank"
                >
                  Sign in
                </Link>
              </li>
              <li className="transparent-btn bg-cyan get-started--btn">
                <Link
                  to="/pricing"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderNavigation.defaultProps = {
  type: 'normal'
};

HeaderNavigation.propTypes = {
  type: propType.oneOf(['normal', 'special'])
};

export default HeaderNavigation;
