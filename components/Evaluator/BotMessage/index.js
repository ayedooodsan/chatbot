import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import beautify from 'json-beautify';
import style from './style';
import Bubblechat from '../../common/BubbleChat';

const BotMessage = props => {
  const { detectedIntent, classes } = props;
  detectedIntent.parameters = detectedIntent.parameters.filter(
    parameter => !parameter.name.includes('.original')
  );
  const [collapse, setCollapse] = useState(false);
  return (
    <Bubblechat type="self">
      <div>
        <ButtonBase
          onClick={() => setCollapse(!collapse)}
          className={classes.button}
        >
          <div className={classes.summaryContainer}>
            <Typography variant="subtitle2">
              {detectedIntent.messageName}
            </Typography>
            <Typography variant="caption">
              {detectedIntent.response ? (
                detectedIntent.response
              ) : (
                <i>Empty Default Response</i>
              )}
            </Typography>
          </div>
          {collapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ButtonBase>
        <Collapse in={collapse}>
          <div className={classes.detailContainer}>
            {detectedIntent.parameters.length > 0 && (
              <React.Fragment>
                <Typography variant="subtitle2">Parameters:</Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detectedIntent.parameters.map(parameter => (
                      <TableRow key={parameter.name}>
                        <TableCell className={classes.tableCell}>
                          {parameter.name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {typeof parameter.value === 'object'
                            ? beautify(parameter.value, null, 2, 10)
                            : parameter.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
            )}
          </div>
        </Collapse>
      </div>
    </Bubblechat>
  );
};

BotMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  detectedIntent: PropTypes.object.isRequired
};

export default withStyles(style)(BotMessage);
