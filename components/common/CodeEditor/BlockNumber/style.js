const style = {
  line: {
    padding: '3px 0',
    position: 'relative',
    '&:before': {
      zIndex: 1,
      width: 24,
      content: 'attr(data-line-number)',
      position: 'absolute',
      left: 0,
      top: 3,
      padding: '0 5px',
      textAlign: 'right',
      backgroundColor: '#cccccc',
      color: 'black'
    },
    '&:after': {
      zIndex: -1,
      width: 24,
      height: 'calc(100% + 38px)',
      content: 'attr(data-line-number)',
      position: 'absolute',
      left: 0,
      top: 3,
      textAlign: 'right',
      backgroundColor: '#cccccc',
      color: 'transparent',
      margin: '-22px 0',
      padding: '22px 5px 16px',
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3
    }
  },
  lineText: {
    marginLeft: '2em'
  }
};

export default style;
