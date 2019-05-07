const style = theme => ({
  listItem: {
    paddingLeft: '14px',
    paddingRight: '14px'
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: '#007974',
    fontSize: '.75rem',
    fontWeight: 500
  },
  listItemIcon: {
    color: 'white',
    marginRight: 0
  },
  listItemText: {
    paddingLeft: 14
  },
  listItemTextTyp: {
    color: 'white',
    opacity: 1,
    visibility: 'visible',
    '-webkit-transition': 'opacity 500ms, visibility 500ms',
    transition: 'opacity 500ms, visibility 500ms'
  },
  listItemTextTypClose: {
    opacity: 0,
    visibility: 'hidden'
  },
  listItemTextTypSecondary: {
    fontSize: '.75rem'
  },
  menuContainer: {
    marginLeft: 10,
    marginTop: 8
  },
  menuTitle: {
    padding: '12px 16px 8px'
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10
  },
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 12
  },
  lightPopper: {
    opacity: 1
  }
});

export default style;
