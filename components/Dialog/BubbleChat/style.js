const style = () => ({
  bubbleSelf: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: '2.5rem'
  },
  bubbleOther: {
    display: 'flex',
    marginRight: '2.5rem'
  },
  bubbleContent: {
    borderRadius: '4px',
    borderTopLeftRadius: '0px',
    backgroundColor: 'black',
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
    backgroundColor: 'transparent'
  },
  icon: {
    fontSize: '30px',
    margin: '5px',
    color: '#464646'
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
      border: 'transparent',
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
      border: 'transparent',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent'
    }
  },
  messages: {
    background: '#ecfffe',
    padding: '10px',
    borderRadius: '4px',
    minHeight: '40px'
  },
  otherMessages: {
    boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.20)',
    backgroundColor: 'white',
    position: 'relative'
  },
  selfMessages: {
    order: 1,
    boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.2)',
    position: 'relative'
  },
  wasekusr: {
    color: 'white',
    position: 'absolute',
    left: '-13px',
    top: '-3px',
    width: '20px',
    height: '20px',
    transform: 'scaleX(-1)'
  },
  yeausr: {
    color: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    left: '-13px',
    top: '-2px',
    width: '20px',
    height: '20px',
    transform: 'scaleX(-1)'
  },
  wasek: {
    color: '#ecfffe',
    position: 'absolute',
    right: '-13px',
    bottom: '-2px',
    width: '20px',
    height: '20px'
  },
  yea: {
    color: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    right: '-13px',
    bottom: '-3px',
    width: '20px',
    height: '20px'
  }
});

export default style;
