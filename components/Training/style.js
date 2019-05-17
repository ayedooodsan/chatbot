const style = theme => ({
  listItem: {
    '&:nth-child(odd)': {
      backgroundColor: '#fbfbfb'
    },
    '&:hover': {
      backgroundColor: '#e1e2e4'
    }
  },
  listItemPrimaryTextActive: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  listItemSecondaryTextActive: {
    color: theme.palette.primary.light,
    fontWeight: 500
  }
});

export default style;
