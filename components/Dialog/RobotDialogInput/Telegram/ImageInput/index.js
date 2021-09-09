/* eslint-disable no-unused-vars */
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
    title: !values.title || values.title === '' ? 'title is required' : null,
    imageUrl:
      !values.imageUrl || values.imageUrl === '' ? 'imageUrl is required' : null
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
      title: value.title,
      imageUrl: value.imageUrl
    },
    {
      title: null,
      imageUrl: null
    },
    validation
  );

  const foundError = currentErrors => {
    const { title, imageUrl } = currentErrors;
    return title !== null || imageUrl !== null;
  };

  useEffect(() => {
    const hasNewError = foundError(errors);
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      title: values.title || 'Text',
      imageUrl: values.imageUrl
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError = foundError(newError);
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Image Response"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      <InputBase
        fullWidth
        placeholder="Image url (required)"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.imageUrl)}
        onChange={event => onChangeValue('imageUrl', event.target.value)}
        value={values.imageUrl}
      />
      <InputBase
        fullWidth
        multiline
        placeholder="Description"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.title)}
        onChange={event => onChangeValue('title', event.target.value)}
        value={values.title}
      />
    </ResponseContainer>
  );
};

ButtonInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(ButtonInput);
