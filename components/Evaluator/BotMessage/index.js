import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Bubblechat from '../../common/BubbleChat';

const BotMessage = props => {
  const { detectedIntent } = props;
  return (
    <Bubblechat type="self">
      <Typography variant="caption">{detectedIntent.name}</Typography>
    </Bubblechat>
  );
};

BotMessage.propTypes = {
  detectedIntent: PropTypes.string.isRequired
};

export default BotMessage;
