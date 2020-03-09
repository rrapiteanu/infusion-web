//@ts-nocheck
import React, { Fragment, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/Menu";
import ResponsiveDrawer from "./ResponsiveDrawer";

import logo from "./logo.png";
import { logout, withAuth } from "../../../lib/auth";
import { Avatar } from "@material-ui/core";

const Logo = styled(Avatar)`
  font-size: 15px;
  cursor: pointer;
  background: white;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const LogoText = styled.a`
  font-size: 25px;
  font-weight: 700;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
  }
`;

const NavBar = styled(AppBar)`
  && {
    background-color: white;
    color: black;
    box-shadow: ${props =>
      props.position === "fixed" ? "0 -1px 6px 0 rgba(0, 0, 0, 0.2)" : "none"};
  }
`;

export const toolbarStyles = theme => ({
  root: {
    height: 64,
    [theme.breakpoints.up("sm")]: {
      height: 64
    }
  }
});

const styles = theme => ({
  title: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    color: theme.palette.common.black
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 0
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.black,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.common.black
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

class DashboardMenu extends React.Component {
  state = {
    mobileMoreAnchorEl: null
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logout = event => {
    event.preventDefault();
    logout();
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes, type = "fixed", isAuth } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMobileMenu = (
      <ResponsiveDrawer
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        isAuth={isAuth}
        onClose={this.handleMobileMenuClose}
      />
    );
    return (
      <div>
        <NavBar position={type}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.left}>
              {/* <LogoText href="/">I</LogoText> */}
              <Link underline="none" href="/feed">
                <Logo src={logo}></Logo>
              </Link>
            </div>
            <div className={classes.sectionDesktop}>
              <div className={classes.right}>
                {!isAuth && (
                  <Fragment>
                    <Link
                      variant="h5"
                      color="inherit"
                      underline="none"
                      className={classes.rightLink}
                      href="/login"
                    >
                      Sign in
                    </Link>
                    <Link
                      variant="h5"
                      underline="none"
                      className={classNames(
                        classes.rightLink,
                        classes.linkSecondary
                      )}
                      href="/register"
                    >
                      Sign up
                    </Link>
                  </Fragment>
                )}
                {isAuth && (
                  <Fragment>
                    <Link
                      variant="h5"
                      color="inherit"
                      underline="none"
                      className={classes.rightLink}
                      href="/account-settings"
                    >
                      Account
                    </Link>
                  </Fragment>
                )}
                {isAuth && (
                  <Fragment>
                    <Link
                      variant="h5"
                      color="inherit"
                      underline="none"
                      className={classes.rightLink}
                      onClick={this.logout}
                    >
                      Log out
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </NavBar>
        <div className={classes.placeholder} />
        {renderMobileMenu}
      </div>
    );
  }
}

export default withStyles(styles)(withAuth(DashboardMenu));
