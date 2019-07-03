const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    flex: 1,
    borderBottom: '1px solid #e8e8e8'
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      color: theme.palette.primary.light,
      opacity: 1
    },
    '&$tabSelected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: theme.palette.primary.light
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  },
  container: {
    marginTop: '5px',
    paddingTop: 0
  },
  insideScrollbar: {
    paddingRight: 0
  },
  addContainer: {
    display: 'flex'
  },
  textField: {
    marginBottom: 0
  },
  tabContainer: {
    display: 'flex'
  }
});

export default styles;
