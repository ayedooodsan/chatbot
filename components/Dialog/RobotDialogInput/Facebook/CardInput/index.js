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
    title: !values.title || values.title === '' ? 'Title is required' : null,
    buttons: values.buttons.map(button => {
      const buttonErrors = {};
      if (!button.text || button.text === '') {
        buttonErrors.text = 'Text is required';
      }
      return buttonErrors;
    })
  };
  return errors;
};

const CardInput = props => {
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
      imageUrl: value.imageUrl,
      title: value.title,
      subtitle: value.subtitle,
      buttons: value.buttons.map(button => ({
        key: Date.now() + Math.random(),
        text: button.text,
        postback: button.postback
      }))
    },
    {
      title: null,
      buttons: value.buttons.map(() => ({
        text: null
      }))
    },
    validation
  );

  useEffect(() => {
    const hasNewError =
      errors.buttons.some(button => button.text !== null) && errors.title;
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      title: values.title || 'Card Title',
      subtitle: values.subtitle,
      imageUrl: values.imageUrl,
      buttons: values.buttons.map((button, index) => ({
        text: button.text === '' ? `#${index + 1} text button` : button.text,
        postback: button.postback
      }))
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError =
      newError.buttons.some(button => button.text !== null) && errors.title;
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Card"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      <InputBase
        fullWidth
        placeholder="Image Url"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.imageUrl)}
        onChange={event => onChangeValue('imageUrl', event.target.value)}
        value={values.imageUrl}
      />
      <InputBase
        fullWidth
        placeholder="Title (required)"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.title)}
        onChange={event => onChangeValue('title', event.target.value)}
        value={values.title}
      />
      <InputBase
        fullWidth
        placeholder="Subtitle"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.subtitle)}
        onChange={event => onChangeValue('subtitle', event.target.value)}
        value={values.subtitle}
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
              placeholder="Button text (required)"
              onFocus={() => setFocus(true)}
              error={Boolean(errors.buttons[index].text)}
              onChange={event =>
                onChangeObjectValueArray(
                  'buttons',
                  index,
                  'text',
                  event.target.value
                )
              }
              value={button.text}
            />
          </div>
          <InputBase
            fullWidth
            placeholder="URL or text postback"
            classes={{ input: classes.hasLeftPaddingInput }}
            onFocus={() => setFocus(true)}
            error={Boolean(errors.buttons[index].postback)}
            onChange={event =>
              onChangeObjectValueArray(
                'buttons',
                index,
                'postback',
                event.target.value
              )
            }
            value={button.postback}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'buttons',
            { key: Date.now() + Math.random(), postback: null, text: '' },
            { value: null }
          )
        }
      >
        Add Button
      </Button>
    </ResponseContainer>
  );
};

CardInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(CardInput);
