import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
      key={suggestion.key ? suggestion.key : suggestion.id}
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
  inputValue: ''
};

renderSuggestion.propTypes = {
  suggestion: PropTypes.shape({ title: PropTypes.string }).isRequired,
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  inputValue: PropTypes.string
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
    params,
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
            className={classes.suggestions}
            {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}
          >
            {suggestions(inputValue, result => {
              const filteredParam = params
                .filter(
                  param =>
                    param.name.search(RegExp(inputValue || '', 'i')) !== -1
                )
                .map(param => ({
                  title: param.name,
                  id: param.entity.id,
                  key: param.key
                }));
              let hasParamLabel = false;
              let hasEntityLabel = false;
              const mergedSuggestions = [...filteredParam, ...result];
              return mergedSuggestions.length === 0 ? (
                <Typography
                  variant="body2"
                  style={{
                    margin: '11px 16px'
                  }}
                >
                  No matching entities
                </Typography>
              ) : (
                mergedSuggestions.map((suggestion, index) => {
                  if (!hasParamLabel) {
                    hasParamLabel = true;
                    return (
                      <React.Fragment key={`key-${suggestion.key}`}>
                        {result.length !== 0 && filteredParam.length !== 0 && (
                          <Typography
                            color="primary"
                            variant="overline"
                            style={{
                              margin: '10px 0 0 16px'
                            }}
                          >
                            Params
                          </Typography>
                        )}
                        {renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion }),
                          highlightedIndex,
                          selectedItem
                        })}
                      </React.Fragment>
                    );
                  }
                  if (!hasEntityLabel && hasParamLabel && !suggestion.key) {
                    hasEntityLabel = true;
                    return (
                      <React.Fragment key={`${suggestion.id}-labeled`}>
                        {result.length !== 0 && filteredParam.length !== 0 && (
                          <React.Fragment>
                            <Divider
                              style={{
                                marginLeft:
                                  highlightedIndex === index - 1 ? 0 : 16
                              }}
                            />
                            <Typography
                              color="primary"
                              variant="overline"
                              style={{
                                margin: '10px 0 0 16px'
                              }}
                            >
                              Entity
                            </Typography>
                          </React.Fragment>
                        )}
                        {renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion }),
                          highlightedIndex,
                          selectedItem
                        })}
                      </React.Fragment>
                    );
                  }
                  return renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem
                  });
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
  initialValue: {},
  initialInputValue: '',
  onDelete: null
};

SimpleAutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  params: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  initialInputValue: PropTypes.string,
  initialValue: PropTypes.object
};

export default withStyles(styles)(SimpleAutoComplete);
