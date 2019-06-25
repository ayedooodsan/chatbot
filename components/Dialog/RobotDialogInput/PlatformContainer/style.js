const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8'
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
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
    marginTop: 5,
    paddingTop: 0
  },
  insideScrollbar: {
    paddingRight: 10
  },
  addContainer: {
    display: 'flex'
  },
  textField: {
    marginBottom: 0
  }
});

export default styles;
