import { connect } from 'react-redux';

const mapStateToProps = state => ({
  role: state.auth.role
});

export default comp => {
  return connect(mapStateToProps)(comp);
};
