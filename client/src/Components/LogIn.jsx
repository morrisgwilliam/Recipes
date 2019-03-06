import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import * as userService from "../Services/userService";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import styles from "../Styles/Materials/Form";
import RecipesSVG from "./RecipesSVG";
import * as schemas from "../Models/accountSchemas"
import {Formik} from 'formik'

const MyLink = props => <RouterLink {...props} to="/register" />;

class LogInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.validation = schemas.getLogInSchema
    this.state.intialValues = schemas.getLogInSchema.initialValues   
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  logIn = () => {
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
    this.props.history.push("/");
    this.props.setAuthorized();
  };
  onLogInerror = response => {
    console.log(response);
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <RecipesSVG class="st0 svgLogIn" viewBox="0 0 213 60" />
          <Typography component="h1" variant="h5">
            {this.props.location.state
              ? "Sign In With Your New Account"
              : "Sign In"}
          </Typography>
          <Formik initialValues={this.state.initialValues} onSubmit={this.logIn} validationSchema={this.validation()}>
          {props => {
            const {
              values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
            } = props;
          
          return (
          <form className={classes.form} onSubmit={this.logIn}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="EmailAddress">{errors.EmailAddress && touched.EmailAddress? errors.EmailAddress : "Email Address"}</InputLabel>
              <Input
                id="EmailAddress"
                name="EmailAddress"
                //autoComplete="EmailAddress"
                placeholder="Email Address"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.EmailAddress}
                error={errors.EmailAddress && touched.EmailAddress? true : false}
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
          )}}
          </Formik>
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
