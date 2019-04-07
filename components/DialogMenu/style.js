const style = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 63px)',
    backgroundColor: '#4c4c54',
    borderRadius: 0
  },
  header: {
    backgroundColor: '#4c4c54',
    borderRadius: 0,
    padding: '13px 25px'
  },
  footer: {
    borderRadius: 0,
    padding: '5px 10px'
  },
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'auto',
    borderRadius: '0px'
  }
});

export default style;
