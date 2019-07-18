import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
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
  suggestions: {
    maxHeight: 184,
    overflowY: 'overlay'
  }
});

function SimpleAutoComplete(props) {
  const {
    classes,
    input,
    label,
    error,
    initialInputValue,
    initialValue,
    suggestions
  } = props;
  // eslint-disable-next-line no-unused-vars
  const { onChange, value, ...otherInputProps } = input;
  const popperRef = useRef(null);
  return (
    <Downshift
      onChange={selectedItem => {
        onChange(selectedItem);
      }}
      itemToString={item => (item ? item.title : '')}
      initialInputValue={initialInputValue}
      initialSelectedItem={initialValue}
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
            label,
            margin: 'dense',
            variant: 'outlined',
            error,
            classes,
            InputProps: getInputProps(otherInputProps),
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
                  marginLeft: 20,
                  marginBottom: 15,
                  width: popperRef.current
                    ? popperRef.current.clientWidth
                    : null
                }}
              >
                <div className={classes.suggestions}>
                  {suggestions(inputValue, result => {
                    return result.length === 0 ? (
                      <Typography
                        variant="body2"
                        style={{
                          margin: '11px 16px'
                        }}
                      >
                        No matching intents
                      </Typography>
                    ) : (
                      result.map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion }),
                          highlightedIndex,
                          selectedItem
                        })
                      )
                    );
                  })}
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
  initialValue: {},
  initialInputValue: null
};

SimpleAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  initialValue: PropTypes.object,
  initialInputValue: PropTypes.string
};

export default withStyles(styles)(SimpleAutoComplete);
