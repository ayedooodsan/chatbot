const style = theme => ({
  toggleButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 165px)',
    width: 350,
    marginBottom: 20,
    background: '#fafafa'
  },
  infoContainer: {
    flex: 1
  },
  inputContainer: {
    padding: '5px 10px'
  }
});

export default style;
