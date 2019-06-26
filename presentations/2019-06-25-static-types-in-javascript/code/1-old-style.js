// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Menu from './Menu';

type PageProps = {
  isLoggedIn: boolean;
  logout: () => void;
  isMobile: boolean;
};

type PageState = {
  isMenuOpen: boolean;
  isMobile: boolean;
};

class Page extends Component<PageProps, PageState> {
  state = {
    isMenuOpen: false,
    isMobile: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { isMobile } = this.state;

    const width = window.innerWidth;

    if (width <= 768 && !isMobile) {
      this.setState({ isMobile: true });
    } else if (width > 768 && isMobile) {
      this.setState({ isMobile: false });
    }
  };

  toggleMenu = () => {
    const { isMenuOpen } = this.state;

    this.setState({ isMenuOpen: !isMenuOpen });
  };

  render() {
    const { isMenuOpen, isMobile } = this.state;
    const { isLoggedIn, logout } = this.props;

    return (
      <section className={classnames({ isMobile })}>
        {isMenuOpen && <Menu />}
        <button
          onClick={this.toggleMenu}
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
}

const mapStateToProps = state => ({
  isLoggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
