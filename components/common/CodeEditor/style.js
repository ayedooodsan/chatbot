const style = theme => ({
  root: {
    cursor: 'text',
    position: 'relative',
    padding: '6px 0',
    backgroundColor: '#f4f5f7',
    border: '1px solid #f4f5f7',
    '&:hover': {
      border: `1px solid black`
    }
  },
  focusRoot: {
    border: `2px solid ${theme.palette.primary.main} !important`
  },
  errorRoot: {
    border: `1px solid #f44336 !important`
  },
  focusedErrorRoot: {
    border: `2px solid #f44336 !important`
  },
  inputLabel: {
    position: 'absolute',
    transform: 'translate(24px, -11px) scale(0.75)',
    background:
      'linear-gradient(0deg, rgba(244,245,247,1) 0%, rgba(255,255,255,1) 100%)',
    padding: '0 5px'
  },
  focusInputLabel: {
    color: theme.palette.primary.main
  },
  errorInputLabel: {
    color: '#f44336'
  }
});

export default style;
