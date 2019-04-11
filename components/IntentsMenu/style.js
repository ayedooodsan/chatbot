const style = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  activeMenuItem: {
    backgroundColor: theme.palette.primary.main,
    '& $primary, & $icon': {
      color: theme.palette.common.white
    }
  },
  primary: {},
  icon: {},
  noBorderRadius: {
    borderRadius: '0px'
  },
  container: {
    flex: 1,
    borderRadius: '0px'
  },
  header: {
    backgroundColor: '#28282e',
    borderRadius: '0px',
    padding: '13px 25px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 63px)',
    backgroundColor: '#28282e',
    borderRadius: 0
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
