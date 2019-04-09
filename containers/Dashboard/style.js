import {
  container,
  drawerWidth,
  transition
} from '../../libraries/materialDashboardReactStyle';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh'
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginTop: '63px',
    height: 'calc(100vh - 63px)',
    overflow: 'hidden',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  content: {
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)'
  },
  container,
  map: {
    marginTop: '70px'
  }
});

export default appStyle;
