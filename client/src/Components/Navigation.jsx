import React from "react";
import { Route } from "react-router-dom";
import mainList from "../componentList";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";

class Navigation extends React.PureComponent {
  state = {
    open: true,
    anchorEl: null
  };

  redirect = path => this.props.history.push(path);

  navBarRoutes = (route, index) => {
    if (route.nav) {
      return (
        <ListItem
          key={index + 50}
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
    console.log(e.currentTarget);
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
    const { classes, currentUser, logOut, children } = this.props;
    const { anchorEl } = this.state;
    const avatarOpen = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <NavBarDrawer {...this.props} logOut={logOut} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />

          {children}

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
