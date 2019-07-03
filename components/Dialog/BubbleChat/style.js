const style = () => ({
  bubbleSelf: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: '2.5rem'
  },
  bubbleOther: {
    display: 'flex',
    paddingRight: '2.5rem'
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
    paddingTop: '1rem',
    paddingBottom: '0.2rem',
    overflow: 'hidden',
    display: 'flex'
  },
  denseLi: {
    paddingTop: '0.2rem'
  },
  selectedLi: {
    backgroundColor: '#FFECB3'
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
    minWidth: '105px',
    background: '#ecfffe',
    padding: '15px 10px',
    borderRadius: '15px',
    minHeight: '40px'
  },
  otherMessages: {
    boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.20)',
    backgroundColor: 'white',
    position: 'relative',
    borderTopLeftRadius: 0
  },
  selfMessages: {
    order: 1,
    boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.2)',
    position: 'relative',
    borderBottomRightRadius: 0
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
    bottom: '-4px',
    width: '20px',
    height: '20px'
  },
  yea: {
    color: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    right: '-13px',
    bottom: '-5px',
    width: '20px',
    height: '20px'
  }
});

export default style;
