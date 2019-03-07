import React from "react";
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
import { Avatar, MenuItem, Menu } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../Styles/Materials/DashHeader";
import classNames from "classnames";
import mainList from "../../componentList";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class NavBarDrawer extends React.PureComponent {
  state = {
    open: true,
    anchorEl: null
  };

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

  redirect = path => this.props.history.push(path);

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
    const { logOut, classes, currentUser } = this.props;
    const { anchorEl } = this.state;
    const avatarOpen = Boolean(anchorEl);
    return (
      <>
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
              Recipes
            </Typography>
            <IconButton
              type="button"
              color="inherit"
              aria-owns={avatarOpen ? "menu-appbar-user" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <Avatar alt="Remy Sharp">
                {currentUser.email
                  ? currentUser.email.charAt(0).toUpperCase()
                  : "G"}
              </Avatar>
            </IconButton>
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
          <List className={classes.appBarSpacer}>
            {mainList.map(this.navBarRoutes)}
          </List>
        </Drawer>
      </>
    );
  }
}
export default withStyles(styles)(NavBarDrawer);
