import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';

import DialogAnalytics from '../DialogAnalytics';

const AnalyticProduct = props => {
  const { classes } = props;
  const [date, setDate] = useState(moment());
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Analytics" noButton />}
      product={() => (
        <SimpleProductBody>
          <Typography variant="subtitle2">Filter</Typography>
          <Paper elevation={1} className={classes.filter}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                margin="dense"
                label="Date"
                variant="outlined"
                value={date}
                onChange={newDate => setDate(newDate)}
              />
            </MuiPickersUtilsProvider>
          </Paper>
          <DialogAnalytics date={date.format('YYYY-MM-DD')} />
        </SimpleProductBody>
      )}
    />
  );
};

AnalyticProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(AnalyticProduct);
