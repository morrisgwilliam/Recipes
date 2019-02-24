import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import getStyles from "../../Styles/Materials/SearchBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SimpleTable from "./SimpleTable";
import * as recipeService from "../../Services/recipesService";

class Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      diet: "",
      includeIngredients: "",
      recipes: [],
      showTable: false
    };
  }
  getSimpleTable = () =>
    this.state.showTable ? (
      <div className={this.props.classes.tableContainer}>
        <SimpleTable recipes={this.state.recipes} />{" "}
      </div>
    ) : (
      ""
    );
  setIngredients = e => {
    this.setState({
      includeIngredients: e.target.value
    });
  };
  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
  setDiet = value => {
    this.setState({
      diet: value,
      anchorEl: null
    });
  };
  getRecipes = () => {
    const getPayload = () => {
      if (this.state.diet === "") {
        return {
          limitLicense: true,
          offset: 0,
          number: 1,
          includeIngredients: this.state.includeIngredients,
          ranking: 2
        };
      } else {
        return {
          limitLicense: true,
          offset: 0,
          number: 1,
          includeIngredients: this.state.includeIngredients,
          ranking: 2,
          diet: this.state.diet
        };
      }
    };
    const payload = {
      queryParams: getPayload()
    };
    recipeService
      .getByIngredients(payload)
      .then(this.getRecipesOnSuccess)
      .catch();
  };
  getRecipesOnSuccess = response => {
    this.setState({
      recipes: response.data.results,
      showTable: true
    });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl, diet, ingredients } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {`${diet} Recipes`}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <InputBase
                placeholder="Search ..."
                value={ingredients}
                onChange={this.setIngredients}
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
            <IconButton color="inherit" onClick={this.getRecipes}>
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.closeMenu}
            >
              <MenuItem onClick={this.setDiet.bind(this, "Pescetarian")}>
                Pescetarian
              </MenuItem>
              <MenuItem onClick={this.setDiet.bind(this, "Vegan")}>
                Vegan
              </MenuItem>
              <MenuItem onClick={this.setDiet.bind(this, "Vegetarian")}>
                Vegetarian
              </MenuItem>
              <MenuItem onClick={this.setDiet.bind(this, "")}>None</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {this.getSimpleTable()}
      </div>
    );
  }
}

export default withStyles(getStyles)(Container);
