const styles = theme => ({
  root: {
    position: 'relative',
    borderRadius: 4,
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
  onClose: {
    position: 'absolute',
    zIndex: 1000,
    right: 5,
    top: 5
  },
  textMessage: {
    padding: 5,
    backgroundColor: 'rgba(0,161,154,.4)'
  },
  fieldContainer: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    bottom: 0,
    width: '100%',
    borderRadius: '0 0 4px 4px',
    padding: 5
  },
  fileNameField: {
    padding: '5px 5px 0'
  },
  image: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    cursor: 'pointer'
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 4
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
    borderRadius: 4
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  }
});

export default styles;
