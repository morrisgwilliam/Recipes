import React from 'react';
import {Paper} from '@material-ui/core';
import posed from 'react-pose';
import '../../Styles/Pose/list'

// posed Components ////////

const Sidebar = posed.ul({
    open: {
      x: '0%',
      delayChildren: 200,
      staggerChildren: 50
    },
    closed: { x: '-100%', delay: 300 }
  });
  
  const Item = posed.li({
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 }
  });

  /////// React Component Starts Here ////
class Tips extends React.PureComponent {

    state = { isOpen: false };

  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render(){
      const {isOpen} = this.state
        return(
          <Paper>
        <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
        <Item className="item" >Item 1</Item>
        <Item className="item" >Item 2</Item>
        <Item className="item" >Item 3</Item>
        <Item className="item" >Item 4</Item>
      </Sidebar>
      </Paper>
        )
    }
}

export default Tips