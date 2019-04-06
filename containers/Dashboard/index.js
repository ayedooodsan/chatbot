import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Header from '../Header';
import Sidebar from '../Sidebar';

import style from './style';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '/static/img/sidebar-1.jpg',
      color: 'green',
      fixedClasses: 'dropdown show',
      mobileOpen: false
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  // eslint-disable-next-line no-shadow
  handleImageClick = image => {
    this.setState({ image });
  };

  handleColorClick = color => {
    this.setState({ color });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };

  handleDrawerToggle = () => {
    this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          logoText="Chatbot"
          logo="/static/img/reactlogo.png"
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
        />
        <Header handleDrawerToggle={this.handleDrawerToggle} />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(style)(Dashboard);
