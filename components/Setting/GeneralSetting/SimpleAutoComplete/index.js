import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, className, ...other } = inputProps;
  return (
    <InputBase
      className={className}
      inputRef={ref}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
      {...InputProps}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  inputValue
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (inputValue || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion}
    </MenuItem>
  );
}

renderSuggestion.defaultProps = {
  highlightedIndex: null,
  index: null,
  itemProps: null,
  inputValue: null
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  inputValue: PropTypes.string,
  suggestion: PropTypes.shape({ title: PropTypes.string }).isRequired
};

const styles = () => ({
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  suggestions: {
    height: 184,
    overflowY: 'overlay'
  }
});

function SimpleAutoComplete(props) {
  const {
    classes,
    onChange,
    label,
    error,
    initialValue,
    initialInputValue,
    suggestions,
    placeholder,
    className
  } = props;
  // eslint-disable-next-line no-unused-vars
  const popperRef = useRef(null);
  return (
    <Downshift
      id="auto-complete"
      onChange={selectedItem => {
        onChange(selectedItem);
      }}
      initialSelectedItem={initialValue}
      initialInputValue={initialInputValue}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem
      }) => (
        <div>
          {renderInput({
            placeholder,
            className,
            fullWidth: true,
            label,
            margin: 'dense',
            error,
            classes,
            ...getInputProps(),
            ref: node => {
              popperRef.current = node;
            }
          })}
          <Popper
            open={isOpen}
            anchorEl={popperRef.current}
            placement="bottom-start"
            style={{ zIndex: 1 }}
            modifiers={{
              flip: {
                enabled: true
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window'
              }
            }}
          >
            <div
              {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}
            >
              <Paper
                square
                style={{
                  width: popperRef.current
                    ? popperRef.current.clientWidth
                    : null
                }}
              >
                <div className={classes.suggestions}>
                  {suggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem
                    })
                  )}
                </div>
              </Paper>
            </div>
          </Popper>
        </div>
      )}
    </Downshift>
  );
}

SimpleAutoComplete.defaultProps = {
  error: false,
  initialValue: '',
  initialInputValue: '',
  className: '',
  label: ''
};

SimpleAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  initialValue: PropTypes.string,
  initialInputValue: PropTypes.string
};

export default withStyles(styles)(SimpleAutoComplete);
