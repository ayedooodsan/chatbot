import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridContainer from 'material-dashboard-react/dist/components/Grid/GridContainer';
import GridItem from 'material-dashboard-react/dist/components/Grid/GridItem';
import withData from '../libraries/withData';
import Dashboard from '../containers/Dashboard';
import DialogMenu from '../components/DialogMenu';
import BubbleChat from '../components/BubbleChat';

const style = () => ({
  container: {
    width: 'inherit'
  }
});

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.dialogList = React.createRef();
  }

  render() {
    return (
      <Dashboard>
        <GridContainer>
          <GridItem md={3}>
            <DialogMenu />
          </GridItem>
          <GridItem md={9}>
            <BubbleChat type="sender">
              <div>Cek</div>
            </BubbleChat>
          </GridItem>
        </GridContainer>
      </Dashboard>
    );
  }
}

Dialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(withData(Dialog));
