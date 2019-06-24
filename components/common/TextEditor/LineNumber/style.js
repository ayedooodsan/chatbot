const style = {
  line: {
    padding: '3px 0',
    position: 'relative',
    '&:before': {
      zIndex: 1,
      width: 18,
      content: 'attr(data-line-number)',
      position: 'absolute',
      left: 0,
      top: 3,
      padding: '0 5px',
      textAlign: 'right',
      backgroundColor: '#cccccc',
      marginLeft: '-8px',
      paddingLeft: '8px',
      color: 'black'
    },
    '&:after': {
      zIndex: -1,
      width: 18,
      height: '100%',
      content: 'attr(data-line-number)',
      position: 'absolute',
      left: 0,
      top: 3.5,
      textAlign: 'right',
      backgroundColor: '#cccccc',
      marginLeft: '-8px',
      paddingLeft: '8px',
      color: 'transparent',
      margin: '-15.5px 0',
      padding: '15.5px 5px  10px',
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3
    }
  },
  lineText: {
    marginLeft: '1.75em'
  }
};

export default style;
