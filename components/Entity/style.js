const style = theme => ({
  listItemTextActive: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  listItem: {
    '&:nth-child(odd)': {
      backgroundColor: '#fbfbfb'
    },
    '&:hover': {
      backgroundColor: '#e1e2e4'
    }
  }
});

export default style;
