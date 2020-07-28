import { connect } from 'react-redux';

const mapStateToProps = state => ({
  role: state.auth.role,
  username: state.auth.username
});

export default comp => {
  return connect(mapStateToProps)(comp);
};
