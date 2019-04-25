import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, autoFocus, ...other } = inputProps;
  return (
    <TextField
      autoFocus={autoFocus}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
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
  const isSelected = (inputValue || '').indexOf(suggestion.title) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.title}
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
  }
});

function SimpleAutoComplete(props) {
  const {
    classes,
    input,
    label,
    error,
    initialValue,
    suggestions,
    autoFocus
  } = props;
  // eslint-disable-next-line no-unused-vars
  const { onChange, value, ...otherInputProps } = input;
  return (
    <Downshift
      onChange={selectedItem => {
        onChange(selectedItem);
      }}
      itemToString={item => (item ? item.title : '')}
      initialInputValue={initialValue}
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
            fullWidth: true,
            autoFocus,
            label,
            margin: 'dense',
            variant: 'outlined',
            error,
            classes,
            InputProps: getInputProps(otherInputProps)
          })}
          <div
            {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}
          >
            {suggestions(inputValue, result => {
              return result.map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion }),
                  highlightedIndex,
                  selectedItem
                })
              );
            })}
          </div>
        </div>
      )}
    </Downshift>
  );
}

SimpleAutoComplete.defaultProps = {
  error: false,
  autoFocus: false,
  initialValue: null
};

SimpleAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  initialValue: PropTypes.string
};

export default withStyles(styles)(SimpleAutoComplete);
