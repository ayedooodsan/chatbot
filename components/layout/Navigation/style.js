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
    '-webkit-transition': 'opacity 500ms, visibility 500ms',
    transition: 'opacity 500ms, visibility 500ms'
  },
  listItemTextClose: {
    opacity: 0,
    visibility: 'hidden'
  },
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 12
  },
  lightPopper: {
    marginLeft: -5,
    opacity: 1
  }
});

export default style;
