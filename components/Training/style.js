const style = theme => ({
  listItem: {
    '&:nth-child(odd)': {
      backgroundColor: '#f4f5f7'
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
  },
  noData: {
    padding: 15
  }
});

export default style;
