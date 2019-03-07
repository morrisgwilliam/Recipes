import React from "react";
import styles from "../Styles/Materials/DashHeader";
import { withStyles } from "@material-ui/core/styles";

import NavBarDrawer from "./Navigation/NavBarDrawer";

const Navigation = props => {
  const { classes, logOut, children } = props;
  return (
    <div className={classes.root}>
      <NavBarDrawer {...props} logOut={logOut} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Navigation);
