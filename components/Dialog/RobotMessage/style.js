const style = () => ({
  headerBubble: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    marginLeft: 15,
    position: 'absolute',
    top: -13,
    right: 10
  },
  iconButton: {
    padding: '5px'
  },
  miniIcon: {
    fontSize: '16px'
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px 40px 0px'
  },
  chip: {
    marginLeft: '5px',
    marginBottom: '5px'
  },
  selectedChipContainer: {
    backgroundColor: '#FFECB3'
  }
});

export default style;
