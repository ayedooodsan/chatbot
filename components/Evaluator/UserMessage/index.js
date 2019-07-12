import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Bubblechat from '../../common/BubbleChat';

const UserMessage = props => {
  const { text } = props;
  return (
    <Bubblechat type="other">
      <Typography variant="caption">{text}</Typography>
    </Bubblechat>
  );
};

UserMessage.propTypes = {
  text: PropTypes.string.isRequired
};

export default UserMessage;
