const style = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    margin: '8px 0'
  },
  inputContainer: {
    flex: 1
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '4px'
  },
  margin: {
    margin: '0px 10px'
  },
  noRightMargin: {
    marginRight: 0
  },
  preview: {
    margin: '0 10px'
  },
  checkboxLabel: {
    color: 'rgba(0, 0, 0, 0.54)',
    margin: '0.4rem 0 0 1rem'
  },
  checkboxes: {
    marginTop: '-0.5rem'
  }
});

export default style;
