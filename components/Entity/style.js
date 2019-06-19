const style = theme => ({
  listItemTextActive: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  listItem: {
    '&:nth-child(odd)': {
      backgroundColor: '#f4f5f7'
    },
    '&:hover': {
      backgroundColor: '#e1e2e4'
    }
  },
  noData: {
    padding: 15
  }
});

export default style;
