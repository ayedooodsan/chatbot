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
    options: values.options.map(option => {
      if (!option.value || option.value === '') {
        return { value: 'Option name is required' };
      }
      return { value: null };
    })
  };
  return errors;
};

const SelectInput = props => {
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
      options: value.options.map(option => ({
        key: Date.now() + Math.random(),
        value: option
      }))
    },
    {
      options: value.options.map(() => ({
        value: null
      }))
    },
    validation
  );

  useEffect(() => {
    const hasNewError = errors.options.some(option => option.value !== null);
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      options: values.options.map((option, index) =>
        option.value === '' ? `#${index + 1} option` : option.value
      )
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError = newError.options.some(option => option.value !== null);
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Select Response"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      {values.options.map((option, index) => (
        <div key={option.key} className={classes.optionRoot}>
          <IconButton
            className={classes.iconButton}
            onClick={() => deleteArrayValue('options', index)}
          >
            <Delete fontSize="small" />
          </IconButton>
          <Divider className={classes.divider} />
          <InputBase
            fullWidth
            placeholder="Option name (required)"
            onFocus={() => setFocus(true)}
            error={Boolean(errors.options[index].value)}
            onChange={event =>
              onChangeObjectValueArray(
                'options',
                index,
                'value',
                event.target.value
              )
            }
            value={option.value}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'options',
            { key: Date.now() + Math.random(), value: '' },
            { value: null }
          )
        }
      >
        Add Option
      </Button>
    </ResponseContainer>
  );
};

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(SelectInput);
