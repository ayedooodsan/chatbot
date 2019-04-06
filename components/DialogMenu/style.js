const style = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  noBorderRadius: {
    borderRadius: '0px'
  },
  container: {
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 65px)',
    borderRadius: '0px'
  },
  header: {
    backgroundColor: '#28282e',
    borderRadius: '0px',
    padding: '13px 25px'
  },
  root: {
    backgroundColor: '#28282e'
  },
  whiteText: {
    color: 'white'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default style;
