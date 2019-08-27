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
    text: !values.text || values.text === '' ? 'Text is required' : null,
    buttons: values.buttons.map(button => {
      const buttonErrors = {};
      if (!button.title || button.title === '') {
        buttonErrors.title = 'Title is required';
      }
      return buttonErrors;
    })
  };
  return errors;
};

const ButtonInput = props => {
  const [focus, setFocus] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { classes, value, onChange } = props;
  const {
    values,
    errors,
    onChangeValue,
    onChangeObjectValueArray,
    addArrayValue,
    deleteArrayValue,
    onSubmit
  } = useResponseState(
    {
      text: value.text,
      buttons: value.buttons.map(button => ({
        key: new Date().getTime() + Math.random(),
        title: button.title,
        value: button.value
      }))
    },
    {
      text: null,
      buttons: value.buttons.map(() => ({
        title: null
      }))
    },
    validation
  );

  useEffect(() => {
    const hasNewError =
      errors.buttons.some(button => button.title !== null) && errors.text;
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      text: values.text || 'Text',
      buttons: values.buttons.map((button, index) => ({
        title: button.title === '' ? `#${index + 1} title` : button.title,
        value:
          // eslint-disable-next-line no-nested-ternary
          button.value === ''
            ? button.title === ''
              ? `#${index + 1} title`
              : button.title
            : button.value
      }))
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError =
      newError.buttons.some(button => button.title !== null) && errors.text;
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Button"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      <InputBase
        fullWidth
        placeholder="Text (required)"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.text)}
        onChange={event => onChangeValue('text', event.target.value)}
        value={values.text}
      />
      {values.buttons.map((button, index) => (
        <div key={button.key}>
          <div className={classes.optionRoot}>
            <IconButton
              className={classes.iconButton}
              onClick={() => deleteArrayValue('buttons', index)}
            >
              <Delete fontSize="small" />
            </IconButton>
            <Divider className={classes.divider} />
            <InputBase
              fullWidth
              placeholder="Button title (required)"
              onFocus={() => setFocus(true)}
              error={Boolean(errors.buttons[index].title)}
              onChange={event =>
                onChangeObjectValueArray(
                  'buttons',
                  index,
                  'title',
                  event.target.value
                )
              }
              value={button.title}
            />
          </div>
          <InputBase
            fullWidth
            placeholder="URL or text postback"
            classes={{ input: classes.hasLeftPaddingInput }}
            onFocus={() => setFocus(true)}
            error={Boolean(errors.buttons[index].value)}
            onChange={event =>
              onChangeObjectValueArray(
                'buttons',
                index,
                'value',
                event.target.value
              )
            }
            value={button.value}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'buttons',
            { key: new Date().getTime() + Math.random(), value: '', title: '' },
            { value: null }
          )
        }
      >
        Add Button
      </Button>
    </ResponseContainer>
  );
};

ButtonInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(ButtonInput);
