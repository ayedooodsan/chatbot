const style = theme => ({
  listItem: {
    backgroundColor: '#f4f5f7',
    '&:hover': {
      backgroundColor: '#e1e2e4'
    }
  },
  listItemTextActive: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  secondaryAction: {
    padding: 5
  }
});

export default style;
