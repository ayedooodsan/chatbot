const drawerWidth = 200;

const style = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    color: 'white'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: theme.palette.primary.main
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: '58px',
    backgroundColor: theme.palette.primary.main
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  button: {
    padding: '8px',
    color: 'white'
  },
  listItemActive: {
    backgroundColor: theme.palette.primary.dark
  },
  listItemIcon: {
    color: 'white',
    marginRight: 0
  },
  listItemText: {
    color: 'white',
    opacity: 1,
    visibility: 'visible',
    '-webkit-transition': 'opacity 2000ms, visibility 2000ms',
    transition: 'opacity 2000ms, visibility 2000ms'
  },
  listItemTextClose: {
    opacity: 0,
    visibility: 'hidden'
  }
});

export default style;
