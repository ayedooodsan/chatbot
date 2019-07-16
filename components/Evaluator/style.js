const style = theme => ({
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: theme.spacing.unit * 2
  },
  buttonContainerMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  buttonContainerMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })
  },
  button: {
    marginLeft: 10
  },
  trainWrapper: {
    display: 'inline-block',
    position: 'relative'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 165px)',
    width: '30vw',
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
  },
  trainProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -8
  }
});

export default style;
