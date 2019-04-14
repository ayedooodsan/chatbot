const subNavgationWidth = 300;

const style = theme => ({
  root: {
    position: 'relative',
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
    }),
    backgroundColor: '#f4f5f7'
  },
  rootClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '30px',
    backgroundColor: '#f4f5f7'
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
  containerClose: {
    display: 'none'
  }
});

export default style;
