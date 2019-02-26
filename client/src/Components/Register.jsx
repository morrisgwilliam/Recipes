import React from "react";
import {
  CssBaseline,
  Paper,
  Avatar,
  withStyles,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import styles from "../Styles/Materials/Form";
import SelectAllTwoTone from "@material-ui/icons/SelectAllTwoTone";
import * as userService from "../Services/userService";

class RegisterForm extends React.PureComponent {
  register = e => {
    e.preventDefault();
    const payload = {
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword
    };
    userService
      .register(payload)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };
  onRegisterSuccess = () => {
    debugger;
    this.props.history.push("/login", { action: "REGISTERED" });
  };
  onRegisterError = response => {
    debugger;
    console.log(response);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <SelectAllTwoTone />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="Email">Email Address</InputLabel>
                <Input
                  id="Email"
                  name="Email"
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
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirmpassword">
                  Confirm Password
                </InputLabel>
                <Input
                  name="ConfirmPassword"
                  type="Password"
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  //autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.register}
              >
                Register
              </Button>
            </form>
          </Paper>
        </CssBaseline>
      </main>
    );
  }
}
const Register = () => withStyles(styles)(RegisterForm);
export default Register();
