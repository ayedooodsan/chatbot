import React from 'react';
import PropTypes from 'prop-types';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';

import style from './style';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '/static/img/sidebar-1.jpg',
      color: 'blue',
      fixedClasses: 'dropdown show',
      mobileOpen: false
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      this.ps = new PerfectScrollbar(this.mainPanel.current);
    }
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
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          logoText="Creative Tim"
          logo="/static/img/reactlogo.png"
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Header handleDrawerToggle={this.handleDrawerToggle} {...rest} />
          <div className={classes.content}>
            <div className={classes.container}>{this.props.children}</div>
          </div>
          <Footer />
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
