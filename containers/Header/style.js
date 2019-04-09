import {
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor
} from '../../libraries/materialDashboardReactStyle';

const headerStyle = () => ({
  appBar: {
    backgroundColor: 'black',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '0',
    paddingBottom: '0',
    zIndex: '1029',
    color: whiteColor,
    border: '0',
    transition: 'all 150ms ease 0s',
    height: '64px',
    display: 'block'
  },
  container: {
    height: '64px',
    padding: '0'
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    margin: '0',
    '&:hover,&:focus': {
      background: 'transparent'
    }
  },
  appResponsive: {
    top: '8px'
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  project: {
    color: whiteColor,
    width: '245px',
    paddingRight: '15px'
  }
});

export default headerStyle;
