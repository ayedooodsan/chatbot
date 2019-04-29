import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
  },
  input: {
    display: 'flex',
    alignItems: 'center'
  },
  autocomplete: {
    flex: 1,
    marginLeft: 5
  }
});

function SimpleAutoComplete(props) {
  const {
    classes,
    onChange,
    label,
    error,
    initialValue,
    suggestions,
    autoFocus,
    onDelete
  } = props;
  // eslint-disable-next-line no-unused-vars
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
          <div className={classes.input}>
            <div className={classes.autocomplete}>
              {renderInput({
                fullWidth: true,
                autoFocus,
                label,
                margin: 'dense',
                variant: 'outlined',
                error,
                classes,
                InputProps: getInputProps()
              })}
            </div>
            {onDelete && (
              <div className={classes.reset}>
                <IconButton onClick={onDelete} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
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
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  initialValue: PropTypes.string
};

export default withStyles(styles)(SimpleAutoComplete);
