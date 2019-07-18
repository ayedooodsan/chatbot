const subNavgationWidth = 300;

const style = theme => ({
  root: {
    backgroundColor: '#ffffff',
    position: 'relative',
    zIndex: 2,
    width: subNavgationWidth,
    flexShrink: 0,
    borderRadius: 0,
    height: '100vh'
  },
  rootOpen: {
    width: subNavgationWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  rootClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '30px'
  },
  fab: {
    position: 'absolute',
    right: '-20px',
    top: '12px',
    color: 'white'
  },
  container: {
    padding: '10px 5px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  containerHeader: {
    padding: '0 20px 0 15px',
    borderRadius: 0
  },
  containerBody: {
    flex: 1,
    overflow: 'hidden'
  },
  noHeaderContainer: {
    padding: '2px 25px 2px 5px'
  },
  containerClose: {
    display: 'none'
  },
  insideScrollbar: {
    paddingRight: 5
  }
});

export default style;
