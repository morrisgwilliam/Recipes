import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//import PeopleIcon from "@material-ui/icons/People";
import SearchIcon from "@material-ui/icons/Search";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Find Recipes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Recipes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Cooking Tips" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>

  </div>
);
