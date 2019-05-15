const style = theme => ({
  listItem: {
    '&:nth-child(odd)': {
      backgroundColor: '#fbfbfb'
    },
    '&:hover': {
      backgroundColor: '#e1e2e4'
    }
  },
  listItemTextActive: {
    color: theme.palette.primary.main,
    fontWeight: 500
  }
});

export default style;
