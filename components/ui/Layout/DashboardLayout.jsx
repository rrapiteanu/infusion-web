import Head from "next/head";
import * as React from "react";
import styled from "styled-components";

import DashboardMenu from "./../Menu/DashboardMenu";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";

const Container = styled("div")`
  min-height: 100vh;
  background: #f4f6f8;
`;

const Content = styled("div")``;

const drawerWidth = 280;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

const firstLinks = [
  { text: "News Feed", href: "/feed", icon: "" },
  { text: "Groups", href: "/groups", icon: "" },
  { text: "Pages", href: "/pages", icon: "" },
  { text: "Events", href: "/events", icon: "" },
  { text: "Jobs", href: "/jobs", icon: "" },
  { text: "Marketpalce", href: "/marketplace", icon: "" }
];

const DashboardLayout = ({
  children,
  title = "Infusion",
  menuType = "fixed"
}) => {
  const classes = useStyles({});
  const router = useRouter();
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {firstLinks.map((link, index) => (
          <Link key={link.text} href={link.href}>
            <ListItem selected={link.href === router.pathname} button>
              <ListItemText>
                <Typography className={classes.body} variant="h6" gutterBottom>
                  {link.text}
                </Typography>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DashboardMenu />
      <div className={classes.root}>
        <nav className={classes.drawer}>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>{children}</main>
      </div>
    </Container>
  );
};
export default DashboardLayout;
