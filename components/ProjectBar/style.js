import dropdownStyle from '../../libraries/dropDownStyle';
import { drawerWidth } from '../../libraries/materialDashboardReactStyle';

const style = theme => ({
  ...dropdownStyle(theme),
  container: {
    position: 'relative',
    display: 'flex',
    padding: '0 15px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: drawerWidth
  },
  menuTitle: {
    padding: '15px 25px 0px'
  },
  menuContainer: {
    width: '240px'
  },
  resetPaddingTop: {
    paddingTop: '0'
  },
  resetMarginTop: {
    marginTop: '0'
  },
  newAgentForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 25px 15px'
  }
});

export default style;
