import React from "react";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../Styles/Pose/list.css";
import Button from "@material-ui/core/Button";
import styles from "../../Styles/Materials/Accordion";
import { withStyles } from "@material-ui/core/styles";
import { Collapse, CardBody, Card } from "reactstrap";
import * as scraperServices from "../../Services/scraperService";

class Tips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, tips: null, selected: null };
  }

  getAccordion = (tip, index, classes, selected) => {
    return (
      <>
        <Button
          id={index}
          className={classes.materialbutton}
          onClick={this.toggle}
        >
          {tip.title}
        </Button>
        <Collapse isOpen={index === selected && this.state.sameElement}>
          <Card
            style={{
              backgroundColor: "#3f51b5",
              color: "white",
              border: "none"
            }}
          >
            <CardBody>{tip.body}</CardBody>
          </Card>
        </Collapse>
      </>
    );
  };

  componentDidMount() {
    scraperServices
      .getTips()
      .then(this.onGetTipsSuccess)
      .catch(this.onGetTipsError);
  }

  onGetTipsSuccess = ({ data }) => {
    this.setState({
      tips: data
    });
  };
  onGetTipsError = response => console.log(response);
  toggle(e) {
    let sameElement =
      parseInt(e.currentTarget.id) === this.state.selected
        ? !this.state.sameElement
        : true;
    this.setState({
      selected: parseInt(e.currentTarget.id),
      sameElement: sameElement
    });
  }

  render() {
    const { tips, selected } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.appBarSpacer}>
        <Typography variant="h4" gutterBottom component="h2">
          57 Cooking Tips
        </Typography>
        <Paper>
          {tips &&
            tips.map((tip, index) =>
              this.getAccordion(tip, index, classes, selected)
            )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Tips);
