import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import { Avatar, MenuItem, Menu } from "@material-ui/core";
import styles from "../Styles/Materials/DashHeader";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import MyRecipes from "./MyRecipes";
import mainList from "../componentList";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class Navigation extends React.PureComponent {
  state = {
    open: true,
    anchorEl: null
  };

  mapRoutes = (route, index) => {
    return (
      <Route
        key={index}
        {...this.props}
        exact
        path={route.path}
        component={props => <route.component {...props} {...this.props} />}
      />
    );
  };
  redirect = path => this.props.history.push(path);

  navBarRoutes = (route, index) => {
    if (route.nav) {
      return (
        <ListItem
          {...this.props}
          key={index}
          button
          onClick={() => this.redirect(route.path)}
        >
          <ListItemIcon>{route.icon ? <route.icon /> : ""}</ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      );
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
  editUserProfileLink = () => {
    this.props.history.push("/user/edit");
  };
  render() {
    const { classes, currentUser, logOut } = this.props;
    const { anchorEl } = this.state;
    const avatarOpen = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>

            <IconButton
              color="inherit"
              aria-owns={avatarOpen ? "menu-appbar-user" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <Avatar alt="Remy Sharp" className={classes.avatar}>
                {/* Add the user email to the avatar */}

                {currentUser.email && currentUser.email.charAt(0).toUpperCase()}

                <Menu
                  id="menu-appbar-user"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={avatarOpen}
                  onClose={this.closeMenu}
                >
                  <MenuItem onClick={this.editUserProfileLink}>
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          {mainList.map(this.navBarRoutes)}
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route
            path="/dashboard"
            exact
            render={props => (
              <Dashboard
                {...props}
                currentUser={this.state.currentUser}
                logOut={this.logOut}
              />
            )}
          />
          {mainList.map(this.mapRoutes)}
          {/* rendering all routes */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
