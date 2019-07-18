import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import ResponseContainer from '../../ResponseContainer';
import useResponseState from '../../useResponseState';

const validation = values => {
  const errors = {};
  errors.text = null;
  if (!values.image || values.image === '') {
    errors.image = 'Image url is required';
  } else {
    errors.image = null;
  }
  return errors;
};

const ImageInput = props => {
  const [focus, setFocus] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { value, onChange } = props;
  const { values, errors, onChangeValue, onSubmit } = useResponseState(
    {
      text: value.text,
      image: value.image
    },
    {
      text: null,
      image: null
    },
    validation
  );

  const foundError = currentErrors => {
    const { text, image } = currentErrors;
    return text !== null || image !== null;
  };

  useEffect(() => {
    const hasNewError = foundError(errors);
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      text: values.text,
      image: values.image
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
        error={Boolean(errors.image)}
        onChange={event => onChangeValue('image', event.target.value)}
        value={values.image}
      />
      <InputBase
        fullWidth
        multiline
        placeholder="Description"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.text)}
        onChange={event => onChangeValue('text', event.target.value)}
        value={values.text}
      />
    </ResponseContainer>
  );
};

ImageInput.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ImageInput;
