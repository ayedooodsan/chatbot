import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { onChange, classes, autoFocus, ref, ...other } = inputProps;
  const onFormatedChange = event => {
    const formatedKeyword = event.target.value.replace(/[^a-zA-Z\d\s_.-]/, '');
    onChange({
      target: {
        value: formatedKeyword
      }
    });
  };
  return (
    <InputBase
      inputRef={ref}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
      onChange={onFormatedChange}
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
    maxHeight: 184,
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
        <div style={{ width: 'calc(100% - 15px)' }}>
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
                  {suggestions(inputValue).length === 0 ? (
                    <Typography
                      variant="body2"
                      style={{
                        margin: '11px 16px'
                      }}
                    >
                      No matching
                    </Typography>
                  ) : (
                    suggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem
                      })
                    )
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
