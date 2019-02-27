import React from "react";
import posed from "react-pose";
import Paper from "@material-ui/core/Paper";

const Sidebar = posed.ul({
  open: {
    x: "0%",
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: "-100%", delay: 300 }
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class MyRecipes extends React.PureComponent {
  state = { isOpen: false };
  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Paper>
        <Sidebar pose={isOpen ? "open" : "closed"}>
          <Item>Hello</Item>
          <Item>Second</Item>
          <Item>Third</Item>
        </Sidebar>
      </Paper>
    );
  }
}

export default MyRecipes;
