const style = theme => {
  const light = theme.palette.type === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  return {
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
      zIndex: 3,
      position: 'absolute',
      transform: 'translate(32px, -11px) scale(0.75)',
      background:
        'linear-gradient(0deg, rgba(244,245,247,1) 0%, rgba(255,255,255,1) 100%)',
      padding: '0 5px'
    },
    focusInputLabel: {
      color: theme.palette.primary.main
    },
    errorInputLabel: {
      color: '#f44336'
    },
    inputRoot: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '1.1875em',
      cursor: 'text',
      display: 'inline-flex',
      alignItems: 'center'
    },
    multiline: {
      padding: `${8 - 2}px 0 ${8 - 1}px`
    },
    fullWidth: {
      width: '100%'
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      marginLeft: 8,
      flex: 1,
      padding: `${8 - 2}px 0 ${8 - 1}px`,
      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      margin: 0, // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%', // Fix IE 11 width issue
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        '-webkit-appearance': 'none'
      },
      zohoInput: {
        width: '100%'
      }
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    inputTextZoho: {
      marginLeft: '5px',
      width: 'calc(100% - 37px)'
    }
  };
};

export default style;
