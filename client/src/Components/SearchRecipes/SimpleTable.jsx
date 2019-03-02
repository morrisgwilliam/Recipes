import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import * as recipeService from "../../Services/recipesService";
import Button from "@material-ui/core/Button";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Image from "material-ui-image";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
};

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class SimpleTable extends React.Component {
  state = {
    open: false,
    selectedRecipe: null
  };
  mapRecipe = recipe => {
    if (recipe.calories) {
      return (
        <TableRow
          hover={true}
          key={recipe.id}
          id={recipe.id}
          onClick={this.handleClickOpen}
        >
          <TableCell component="th" scope="row">
            {recipe.title}
          </TableCell>
          <TableCell align="right">{recipe.calories}</TableCell>
          <TableCell align="right">{recipe.fat}</TableCell>
          <TableCell align="right">{recipe.carbs}</TableCell>
          <TableCell align="right">{recipe.protein}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow
          hover={true}
          key={recipe.id}
          id={recipe.id}
          onClick={this.handleClickOpen}
        >
          <TableCell component="th" scope="row">
            {recipe.title}
          </TableCell>
          <TableCell align="right">n/a</TableCell>
          <TableCell align="right">n/a</TableCell>
          <TableCell align="right">n/a</TableCell>
          <TableCell align="right">n/a</TableCell>
        </TableRow>
      );
    }
  };
  addRecipe = () => {
    debugger;
    const { selectedRecipe } = this.state;
    const payload = {
      ApiId: selectedRecipe.id,
      UserId: this.props.id,
      Title: selectedRecipe.title,
      Carbs: 0,
      Fat: 0,
      Protein: 0,
      Calories: 0,
      Steps: []
    };
    const recipeSteps = JSON.parse(
      JSON.stringify(selectedRecipe.analyzedInstructions[0].steps)
    );
    for (let i = 0; i < recipeSteps.length; i++) {
      payload.Steps.push(recipeSteps[i].step);
    }
    recipeService
      .addUserRecipes(payload)
      .then(this.handleClose)
      .catch(this.addRecipeOnError);
  };
  addRecipeOnError = response => {
    console.log(response);
  };
  getRecipeOnSuccess = response => {
    this.setState({
      open: true,
      selectedRecipe: response.data
    });
  };
  getRecipeOnError = response => {
    console.log(response.data);
  };
  handleClickOpen = e => {
    recipeService
      .getRecipe(e.currentTarget.id)
      .then(this.getRecipeOnSuccess)
      .catch(this.getRecipeOnError);
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  getDialog = () => {
    if (this.state.selectedRecipe) {
      return (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.state.selectedRecipe.title}
          </DialogTitle>
          <DialogContent>
            <div>
              <Image src={this.state.selectedRecipe.image} />
            </div>
            <ol>
              {this.state.selectedRecipe.analyzedInstructions[0].steps.map(
                (step, index) => {
                  return (
                    <li key={index}>
                      <Typography gutterBottom>{step.step}</Typography>
                    </li>
                  );
                }
              )}
            </ol>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.addRecipe} color="primary">
              Add To My Recipes
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  };
  render() {
    const { classes, recipes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.length > 0 ? (
                recipes.map(this.mapRecipe)
              ) : (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="center">No Results Found</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        {this.getDialog()}
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
