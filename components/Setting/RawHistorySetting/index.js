import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import style from './style';
import connect from './store';
import downloadBase64 from '../../../libraries/download';

const RawHistorySetting = props => {
  const { classes, downloadHistories, projectId } = props;
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'months')
      .startOf('month')
  );
  const [endDate, setEndDate] = useState(
    moment()
      .subtract(1, 'months')
      .endOf('month')
  );

  const download = () => {
    downloadHistories({
      projectId,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    }).then(response => {
      const { filename, stream, mimetype } = response.data.downloadHistories;
      downloadBase64({ filename, stream, mimetype });
    });
  };
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Raw History" noButton />}
      product={() => (
        <SimpleProductBody>
          <Paper className={classes.root}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                className={classes.inputDate}
                margin="dense"
                label="Start Date"
                format="DD MMM YYYY"
                variant="outlined"
                maxDate={endDate || moment()}
                value={startDate}
                onChange={setStartDate}
              />
              <DatePicker
                className={classes.inputDate}
                margin="dense"
                label="End Date"
                format="DD MMM YYYY"
                variant="outlined"
                minDate={startDate || '2019-01-01'}
                maxDate={moment()}
                value={endDate}
                onChange={setEndDate}
              />
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={download}
            >
              Download
            </Button>
          </Paper>
        </SimpleProductBody>
      )}
    />
  );
};

RawHistorySetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  downloadHistories: PropTypes.func.isRequired
};

export default withStyles(style)(connect(RawHistorySetting));
