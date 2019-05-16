import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FlexibleWidthXYPlot, XAxis, VerticalRectSeries } from 'react-vis';

const toMoment = date => moment(date, 'YYYY-MM-DD HH:mm:ss');

const DialogAnalytic = props => {
  const { messages } = props;
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
    const endTime = toMoment(messages[length - 1].responseTime);

    const dialogSec = endTime.diff(startTime, 'seconds');

    plot = messages.reduce(
      (currentPlot, message) => {
        const currentData = currentPlot.data;
        const currentXLabel = currentPlot.xLabel;
        const currentXAxis = currentPlot.xAxis;
        let startSec = offsetTime.diff(startTime, 'seconds');
        let diffSec = null;
        const { requestTime, responseTime } = message;
        if (!offsetTime.isSame(requestTime)) {
          diffSec = toMoment(requestTime).diff(offsetTime, 'seconds');
          currentData.push({
            y0: 0.1,
            y: 0.3,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#ffb74d'
          });

          currentXAxis.push(startSec / dialogSec);
          currentXLabel[
            currentXAxis[currentXAxis.length - 1]
          ] = offsetTime.format('h:mm:ss');

          startSec += diffSec;
          diffSec = toMoment(responseTime).diff(requestTime, 'seconds');
          currentData.push({
            y0: 0.05,
            y: 0.35,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#26a69a'
          });
          currentXAxis.push(startSec / dialogSec);
          currentXLabel[currentXAxis[currentXAxis.length - 1]] = toMoment(
            requestTime
          ).format('h:mm:ss');
        } else {
          diffSec = toMoment(responseTime).diff(offsetTime, 'seconds');
          currentData.push({
            y0: 0.1,
            y: 0.3,
            x0: startSec / dialogSec,
            x: (startSec + diffSec) / dialogSec,
            color: '#26a69a'
          });
          currentXAxis.push(startSec / dialogSec);
          currentXLabel[
            currentXAxis[currentXAxis.length - 1]
          ] = offsetTime.format('h:mm:ss');
        }
        offsetTime = toMoment(message.responseTime);
        return {
          data: currentData,
          xLabel: currentXLabel,
          xAxis: currentXAxis
        };
      },
      {
        data: [],
        xLabel: {},
        xAxis: []
      }
    );

    plot.xAxis.push(1);
    plot.xLabel[plot.xAxis[plot.xAxis.length - 1]] = endTime.format('h:mm:ss');
  }

  return (
    <FlexibleWidthXYPlot
      height={80}
      margin={{ left: 20, right: 20 }}
      colorType="literal"
    >
      <VerticalRectSeries data={plot.data} />
      <XAxis
        hideLine
        labelValues={plot.xLabel}
        tickValues={[0, 1]}
        tickFormat={v => `${v * 100}%`}
      />
    </FlexibleWidthXYPlot>
  );
};

DialogAnalytic.defaultProps = {
  messages: []
};

DialogAnalytic.propTypes = {
  messages: PropTypes.array
};

export default DialogAnalytic;
