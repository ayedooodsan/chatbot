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
    popper: {
      zIndex: 1
    },
    root: {
      margin: '8px 0',
      display: 'flex',
      alignItems: 'center'
    },
    iconButton: {
      padding: 10
    },
    autoCompleteContainer: {
      width: 350,
      marginTop: 5,
      padding: '10px'
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
      }
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    }
  };
};

export default style;
