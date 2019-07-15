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
    width: '25vw',
    marginBottom: 20,
    background: '#fafafa'
  },
  infoContainer: {
    flex: 1,
    padding: '5px 5px 5px 0'
  },
  inputContainer: {
    display: 'flex',
    padding: '5px 10px'
  },
  dialogName: {
    padding: '0 15px'
  }
});

export default style;
