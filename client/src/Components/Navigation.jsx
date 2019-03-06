import React from "react";
import { Route } from "react-router-dom";
import mainList from "../componentList";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/Materials/DashHeader";

import NavBarDrawer from "./Navigation/NavBarDrawer";

class Navigation extends React.Component {
  mapRoutes = (route, index) => {
    debugger;
    return (
      <Route
        key={index}
        {...this.props}
        exact
        path={route.path}
        component={props => (
          <route.component key={index} {...props} {...this.props.currentUser} />
        )}
      />
    );
  };
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname === nextProps.location.pathname
      ? false
      : true;
  }
  render() {
    const { classes, logOut } = this.props;
    return (
      <div className={classes.root}>
        <NavBarDrawer {...this.props} logOut={logOut} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* rendering all routes */}
          {mainList.map(this.mapRoutes)}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
