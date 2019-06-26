// @flow

import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import { useReduxState, useReduxDispatch } from './useRedux';

import Menu from './Menu';

function useIsMobile(): [boolean] {
  const [isMobile, setMobile] = useState<boolean>(false);

  const onResize = useCallback(
    () => {
      const width = window.innerWidth;

      if (width <= 768 && !isMobile) {
        setMobile(true);
      } else if (width > 768 && isMobile) {
        setMobile(false);
      }
    },
    [isMobile, setMobile],
  );

  useEffect(
    () => {
      window.addEventListener('resize', onResize);
      onResize();

      return () => {
        window.removeEventListener('resize', onResize);
      };
    },
    [onResize],
  );

  return [isMobile];
}

function Page() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile] = useIsMobile();

  const toggleMenu = useCallback(
    () => setMenuOpen(!isMenuOpen),
    [isMenuOpen],
  );

  const isLoggedIn = useReduxState(state => state.loggedIn);
  const logout = useReduxDispatch(dispatch => dispatch({ type: 'logout' }));

  return (
    <section className={classnames({ isMobile })}>
      {isMenuOpen && <Menu />}
      <button
        onClick={toggleMenu}
        value={isMenuOpen ? 'close menu' : 'open menu'}
        type="button"
      />

      {isLoggedIn && (
        <button
          onClick={logout}
          type="button"
          value="logout"
        />
      )}
    </section>
  );
}

export default Page;
