import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SelectAllTwoTone from "@material-ui/icons/SelectAllTwoTone";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import * as userService from "../Services/userService";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import styles from "../Styles/Materials/Form";

const MyLink = props => <RouterLink {...props} to="/register" />;

class LogInForm extends React.Component {
  state = {};
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  logIn = () => {
    debugger;
    const payload = {
      EmailAddress: this.state.EmailAddress,
      Password: this.state.Password
    };
    userService
      .logIn(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };
  onLogInSuccess = () => {
    debugger;
    this.props.history.push("/dashboard", { action: "USERLOGIN" });
  };
  onLogInerror = response => {
    debugger;
    console.log(response);
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SelectAllTwoTone />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.location.state
              ? "Sign In With Your New Account"
              : "Sign In"}
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="EmailAddress">Email Address</InputLabel>
              <Input
                id="EmailAddress"
                name="EmailAddress"
                //autoComplete="EmailAddress"
                placeholder="Email Address"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="Password"
                type="Password"
                id="Password"
                placeholder="Password"
                //autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link component={MyLink}>Dont have an account?</Link>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.logIn}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LogInForm.propTypes = {
  classes: PropTypes.object.isRequired
};
const LogIn = () => withStyles(styles)(LogInForm);
export default LogIn();
