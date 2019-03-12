import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import getStyles from "../../Styles/Materials/SearchBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyRecipesTable from "./MyRecipesTable";
import * as recipeService from "../../Services/recipesService";

class MyRecipes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      query: "",
      recipes: [],
      showTable: false
    };
  }
  componentDidMount() {
    this.getUserRecipes();
  }

  getUserRecipes = () => {
    recipeService
      .getUserRecipes({
        userId: this.props.id,
        pageIndex: 0,
        pageSize: 5
      })
      .then(this.onGetUserRecipesSuccess)
      .catch(this.onGetUserRecipesOnError);
  };

  onGetUserRecipesSuccess = ({ data }) => {
    this.setState({
      recipes: data.pagedItems,
      paged: {
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        hasPrevious: data.hasPreviousPage,
        hasNext: data.hasNextPage
      }
    });
  };
  onGetUserRecipesOnError = response => console.log(response);

  setIngredients = e => {
    this.setState({
      includeIngredients: e.target.value
    });
  };

  setQuery = e => {
    this.setState({
      query: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { query } = this.state;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                My Recipes
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <InputBase
                  placeholder="Search ..."
                  value={query}
                  onChange={this.setQuery}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <IconButton color="inherit" onClick={this.getRecipes}>
                <SearchIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <div className={this.props.classes.tableContainer}>
            <MyRecipesTable
              {...this.props}
              recipes={this.state.recipes}
              getUserRecipes={this.getUserRecipes}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(getStyles)(MyRecipes);
