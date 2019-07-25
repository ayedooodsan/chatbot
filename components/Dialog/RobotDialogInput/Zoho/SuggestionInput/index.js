import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponseContainer from '../../ResponseContainer';
import style from './style';
import useResponseState from '../../useResponseState';

const validation = values => {
  const errors = {
    suggestions: values.suggestions.map(suggestion => {
      if (!suggestion.value || suggestion.value === '') {
        return { value: 'Suggestion name is required' };
      }
      return { value: null };
    })
  };
  return errors;
};

const SuggestionInput = props => {
  const [focus, setFocus] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { classes, value, onChange } = props;
  const {
    values,
    errors,
    onChangeObjectValueArray,
    addArrayValue,
    deleteArrayValue,
    onSubmit
  } = useResponseState(
    {
      suggestions: value.suggestions.map(suggestion => ({
        key: Date.now() + Math.random(),
        value: suggestion
      }))
    },
    {
      suggestions: value.suggestions.map(() => ({
        value: null
      }))
    },
    validation
  );

  useEffect(() => {
    const hasNewError = errors.suggestions.some(
      suggestion => suggestion.value !== null
    );
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      suggestions: values.suggestions.map((suggestion, index) =>
        suggestion.value === '' ? `#${index + 1} suggestion` : suggestion.value
      )
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError = newError.suggestions.some(
      suggestion => suggestion.value !== null
    );
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Suggestion Response"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      {values.suggestions.map((suggestion, index) => (
        <div key={suggestion.key} className={classes.suggestionRoot}>
          <IconButton
            className={classes.iconButton}
            onClick={() => deleteArrayValue('suggestions', index)}
          >
            <Delete fontSize="small" />
          </IconButton>
          <Divider className={classes.divider} />
          <InputBase
            fullWidth
            placeholder="Suggestion name (required)"
            onFocus={() => setFocus(true)}
            error={Boolean(errors.suggestions[index].value)}
            onChange={event =>
              onChangeObjectValueArray(
                'suggestions',
                index,
                'value',
                event.target.value
              )
            }
            value={suggestion.value}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'suggestions',
            { key: Date.now() + Math.random(), value: '' },
            { value: null }
          )
        }
      >
        Add Suggestion
      </Button>
    </ResponseContainer>
  );
};

SuggestionInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(SuggestionInput);
