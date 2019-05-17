import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import style from './style';
import DialogAnalytic from '../DialogAnalytic';

import connect from './store';

const DialogAnalytics = props => {
  const { dialogAnalytics, classes } = props;
  const dialogAnalyticGroups = dialogAnalytics.reduce(
    (currentdialogAnalyticGroups, dialogAnalytic) => {
      const foundDialogAnalyticGroup = currentdialogAnalyticGroups.find(
        currentdialogAnalyticGroup =>
          currentdialogAnalyticGroup.groupid === dialogAnalytic.groupid
      );
      if (dialogAnalytic.responseTime !== null) {
        if (foundDialogAnalyticGroup) {
          foundDialogAnalyticGroup.messages.push({
            message: dialogAnalytic.message,
            responseMessage: dialogAnalytic.responseMessage,
            requestTime: dialogAnalytic.requestTime,
            responseTime: dialogAnalytic.responseTime
          });
        } else {
          currentdialogAnalyticGroups.push({
            groupid: dialogAnalytic.groupid,
            messages: [
              {
                message: dialogAnalytic.message,
                responseMessage: dialogAnalytic.responseMessage,
                requestTime: dialogAnalytic.requestTime,
                responseTime: dialogAnalytic.responseTime
              }
            ]
          });
        }
      }
      return currentdialogAnalyticGroups;
    },
    []
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6">Dialog</Typography>
      <Paper elevation={1}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Session Id</TableCell>
              <TableCell align="center">User Messages</TableCell>
              <TableCell align="center">Response Time Avgs</TableCell>
              <TableCell align="center">Response Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dialogAnalyticGroups.map(dialogAnalyticGroup => {
              const avgs =
                dialogAnalyticGroup.messages.reduce((total, message) => {
                  const newTotal =
                    total +
                    moment(message.responseTime, 'YYYY-MM-DD HH:mm:ss').diff(
                      moment(message.requestTime, 'YYYY-MM-DD HH:mm:ss'),
                      'seconds'
                    );
                  return newTotal;
                }, 0) / dialogAnalyticGroup.messages.length;
              return (
                <TableRow key={dialogAnalyticGroup.groupid}>
                  <TableCell component="th" scope="row">
                    {dialogAnalyticGroup.groupid}
                  </TableCell>
                  <TableCell align="center">
                    {dialogAnalyticGroup.messages.length}
                  </TableCell>
                  <TableCell align="center">
                    {avgs === 0
                      ? 'under 1 second'
                      : `${avgs.toFixed(3)} seconds`}
                  </TableCell>
                  <TableCell align="right">
                    <DialogAnalytic
                      key={dialogAnalyticGroup.groupid}
                      messages={dialogAnalyticGroup.messages.filter(
                        message => message.responseTime !== null
                      )}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {dialogAnalyticGroups.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

DialogAnalytics.defaultProps = {
  dialogAnalytics: []
};

DialogAnalytics.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogAnalytics: PropTypes.array
};

export default withStyles(style)(connect(DialogAnalytics));
