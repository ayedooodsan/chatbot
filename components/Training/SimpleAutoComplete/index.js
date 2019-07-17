import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

function renderInput(inputProps) {
  const { InputProps, classes, ref, className, ...other } = inputProps;
  return (
    <TextField
      className={className}
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
      key={suggestion.id + suggestion.title}
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
  },
  createIntent: {
    paddingTop: 16,
    paddingBottom: 16
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
    localIntents,
    className
  } = props;
  // eslint-disable-next-line no-unused-vars
  const popperRef = useRef(null);
  return (
    <Downshift
      onChange={selectedItem => {
        onChange(selectedItem);
      }}
      itemToString={item => (item ? item.title : '')}
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
            variant: 'outlined',
            error,
            classes,
            InputProps: getInputProps(),
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
                  {suggestions(inputValue, result => {
                    const filteredLocalIntents = localIntents.filter(
                      param =>
                        param.title.search(RegExp(inputValue || '', 'i')) !== -1
                    );
                    const mergedResult = [
                      ...filteredLocalIntents,
                      ...result
                    ].sort((a, b) => {
                      const nameA = a.title.toUpperCase();
                      const nameB = b.title.toUpperCase();
                      if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }
                      return 0;
                    });
                    return mergedResult.length === 0 ? (
                      <MenuItem
                        className={classes.createIntent}
                        {...getItemProps({
                          item: {
                            id: Date.now() + Math.random(),
                            title: inputValue,
                            isNew: true
                          }
                        })}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: 'primary'
                          }}
                          primary="Create new intent"
                          secondaryTypographyProps={{
                            style: {
                              color: 'black'
                            }
                          }}
                          secondary={inputValue}
                        />
                      </MenuItem>
                    ) : (
                      mergedResult.map((suggestion, index) =>
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
  initialInputValue: null,
  className: '',
  localIntents: [],
  label: ''
};

SimpleAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  localIntents: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  initialValue: PropTypes.object,
  initialInputValue: PropTypes.string
};

export default withStyles(styles)(SimpleAutoComplete);
