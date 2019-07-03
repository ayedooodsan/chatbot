const style = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px 5px'
  },
  body: {
    postion: 'relative',
    flex: 1
  },
  messages: {
    paddingTop: 10,
    marginBottom: 5
  },
  inputContainer: {
    position: 'relative',
    zIndex: 0,
    flex: 1,
    height: 'calc(100% + 10px)',
    margin: '0px -5px 0px 5px',
    padding: 15,
    borderRadius: 0
  },
  startContainer: {
    padding: '10px 20px'
  }
});

export default style;
