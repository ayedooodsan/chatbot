import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Clipboard from 'react-clipboard.js';
import style from './style';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const UploadFileTemplate = props => {
  const [open, setOpen] = useState(false);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Tooltip
        onClose={() => setOpen(false)}
        open={open}
        title="Copied"
        placement="top"
      >
        <Clipboard
          onSuccess={() => setOpen(true)}
          component="span"
          data-clipboard-target="#uploadFileTemplate"
        >
          <Button className={classes.button}>copy to clipboard</Button>
        </Clipboard>
      </Tooltip>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dialog Title</CustomTableCell>
            <CustomTableCell>User Input</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell>Dialog A</CustomTableCell>
            <CustomTableCell>User input A</CustomTableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <CustomTableCell>Dialog A</CustomTableCell>
            <CustomTableCell>User input B</CustomTableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <CustomTableCell>Dialog B</CustomTableCell>
            <CustomTableCell>User input C</CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <table id="uploadFileTemplate" className={classes.dummyTable}>
        <thead>
          <tr>
            <td>Dialog Title</td>
            <td>User Input</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dialog A</td>
            <td>User input A</td>
          </tr>
          <tr>
            <td>Dialog A</td>
            <td>User input B</td>
          </tr>
          <tr>
            <td>Dialog B</td>
            <td>User input C</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

UploadFileTemplate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(UploadFileTemplate);
