const style = () => ({
  bubbleSelf: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bubbleOther: {
    display: 'flex'
  },
  bubbleContent: {
    borderRadius: '4px',
    borderTopLeftRadius: '0px',
    backgroundColor: 'white',
    padding: '5px 10px',
    minWidth: '100px'
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderTop: '10px solid white',
    borderRight: '10px solid white',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid transparent'
  },
  li: {
    padding: '0.5rem',
    overflow: 'hidden',
    display: 'flex'
  },
  img: {
    display: 'block',
    width: '40px',
    height: '40px',
    backgroundColor: '#4c4c54'
  },
  icon: {
    fontSize: '30px',
    margin: '5px',
    color: 'white'
  },
  avatarSelf: {
    width: '40px',
    position: 'relative',
    order: 2,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      border: '5px solid white',
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      boxShadow: '1px 1px 2px rgba(black, 0.2)'
    }
  },
  avatarOther: {
    width: '40px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 0,
      height: 0,
      border: '5px solid white',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent'
    }
  },
  messages: {
    background: 'white',
    padding: '10px',
    borderRadius: '4px',
    minHeight: '40px'
  },
  otherMessages: {
    borderTopLeftRadius: 0,
    boxShadow: '1px 3px 3.5px 0px rgba(0,0,0,0.20)'
  },
  selfMessages: {
    order: 1,
    borderBottomRightRadius: 0,
    boxShadow:
      '9px 3px 3.5px 0px rgba(0,0,0,0.2), -3px 3px 3.5px 0px rgba(0,0,0,0.1)'
  }
});

export default style;
