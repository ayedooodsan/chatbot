import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { XYPlot, XAxis, VerticalRectSeries, Hint } from 'react-vis';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const toMoment = date => moment(date, 'YYYY-MM-DD HH:mm:ss');

const DialogAnalytic = props => {
  const [hint, setHint] = useState(null);
  const { messages, classes, from } = props;
  const { length } = messages;
  messages.sort((firstMessage, secondMessage) => {
    if (
      toMoment(firstMessage.requestTime).isBefore(secondMessage.requestTime)
    ) {
      return -1;
    }
    if (toMoment(firstMessage.requestTime).isAfter(secondMessage.requestTime)) {
      return 1;
    }
    return 0;
  });

  let plot = {
    data: [],
    xLabel: [],
    xAxis: []
  };

  if (messages.length > 0) {
    let offsetTime = toMoment(messages[0].requestTime);
    const startTime = toMoment(messages[0].requestTime);
    let endTime = toMoment(messages[length - 1].responseTime);

    let dialogSec = endTime.diff(startTime, 'seconds');
    if (dialogSec === 0) {
      dialogSec = 1;
      endTime = endTime.add(1, 'seconds');
    }

    plot = messages.reduce(
      (currentPlot, message) => {
        const currentBotData = currentPlot.botData;
        const currentUserData = currentPlot.userData;
        const currentXLabel = currentPlot.xLabel;
        const currentXAxis = currentPlot.xAxis;
        let startSec = offsetTime.diff(startTime, 'seconds');
        let diffSec = null;
        const { requestTime, responseTime } = message;
        if (!offsetTime.isSame(requestTime)) {
          diffSec = toMoment(requestTime).diff(offsetTime, 'seconds');
          currentUserData.push({
            y0: 0.1,
            y: 0.3,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#ffb74d'
          });

          currentXAxis.push(startSec / dialogSec);
          currentXLabel[
            currentXAxis[currentXAxis.length - 1]
          ] = offsetTime.format('HH:mm:ss');

          startSec += diffSec;
          diffSec = toMoment(responseTime).diff(requestTime, 'seconds');
          diffSec = diffSec === 0 ? 0.1 : diffSec;
          currentBotData.push({
            y0: 0.05,
            y: 0.35,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#26a69a',
            meta: {
              userMessage: message.message,
              botMessage: message.responseMessage,
              diffSec
            }
          });
          currentXAxis.push(startSec / dialogSec);
          currentXLabel[currentXAxis[currentXAxis.length - 1]] = toMoment(
            requestTime
          ).format('HH:mm:ss');
        } else {
          diffSec = toMoment(responseTime).diff(offsetTime, 'seconds');
          diffSec = diffSec === 0 ? 0.1 : diffSec;
          currentBotData.push({
            y0: 0.05,
            y: 0.35,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#26a69a',
            meta: {
              userMessage: message.message,
              botMessage: message.responseMessage,
              diffSec
            }
          });
          currentXAxis.push(startSec / dialogSec);
          currentXLabel[
            currentXAxis[currentXAxis.length - 1]
          ] = offsetTime.format('HH:mm:ss');
        }
        offsetTime = toMoment(message.responseTime);
        return {
          userData: currentUserData,
          botData: currentBotData,
          xLabel: currentXLabel,
          xAxis: currentXAxis
        };
      },
      {
        userData: [],
        botData: [],
        xLabel: {},
        xAxis: []
      }
    );

    plot.xAxis.push(1);
    plot.xLabel[plot.xAxis[plot.xAxis.length - 1]] = endTime.format('HH:mm:ss');
  }

  const onNearestX = dataPoint => {
    setHint({
      rectPostition: {
        x0: dataPoint.x0 - 0.005,
        x: dataPoint.x + 0.005,
        y0: dataPoint.y0,
        y: dataPoint.y,
        color: '#004d40'
      },
      position: {
        x: (dataPoint.x + dataPoint.x0) / 2,
        y: dataPoint.y + 0.05
      },
      meta: dataPoint.meta
    });
  };

  return (
    <XYPlot
      onMouseLeave={() => setHint(null)}
      className={classes.root}
      height={80}
      width={600}
      xDomain={[0, 1]}
      margin={{ left: 25, right: 25 }}
      colorType="literal"
    >
      <XAxis
        hideLine
        labelValues={plot.xLabel}
        tickValues={[0, 1]}
        tickFormat={v => plot.xLabel[v]}
      />
      <VerticalRectSeries data={plot.userData} />
      {hint && <VerticalRectSeries data={[hint.rectPostition]} />}
      <VerticalRectSeries data={plot.botData} onNearestX={onNearestX} />
      {hint && (
        <Hint
          className={classes.hintRoot}
          value={hint.position}
          align={{
            vertical: 'top',
            horizontal: 'auto'
          }}
        >
          <Paper className={classes.hint}>
            <Typography align="left" variant="overline">
              <b>{from} says: </b>
            </Typography>
            <Typography align="left" variant="caption">
              {hint.meta.userMessage}
            </Typography>
            <Typography align="left" variant="overline">
              <b>Bot says: </b>
            </Typography>
            <Typography align="left" variant="caption">
              {hint.meta.botMessage.length > 115
                ? `${hint.meta.botMessage.slice(0, 115)}...`
                : hint.meta.botMessage}
            </Typography>
            <Typography align="left" variant="overline">
              <b>Response time: </b>
            </Typography>
            <Typography align="left" variant="caption">
              {hint.meta.diffSec} seconds
            </Typography>
          </Paper>
        </Hint>
      )}
    </XYPlot>
  );
};

DialogAnalytic.defaultProps = {
  messages: []
};

DialogAnalytic.propTypes = {
  classes: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  messages: PropTypes.array
};

export default withStyles(style)(DialogAnalytic);
