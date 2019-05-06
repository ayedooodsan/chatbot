const style = theme => {
  return {
    root: {
      margin: '8px 0',
      padding: 10,
      display: 'flex',
      alignItems: 'flex-start'
    },
    fieldContainer: {
      flex: 1
    },
    fieldName: {
      paddingTop: 5
    },
    buttonContainer: {
      padding: '0 12px 0 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    iconButton: {
      marginBottom: 5
    },
    selectedDelete: {
      color: '#f44336'
    },
    selectedCheck: {
      color: theme.palette.primary.main
    },
    intentEditor: {
      minHeight: 44,
      backgroundColor: '#f4f5f7',
      borderRadius: 4
    },
    noMarginTop: {
      marginTop: 0
    }
  };
};

export default style;
