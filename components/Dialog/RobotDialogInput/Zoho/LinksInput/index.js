import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponseContainer from '../../ResponseContainer';
import style from '../../Facebook/ButtonInput/style';
import useResponseState from '../../useResponseState';

const validation = values => {
  const errors = {};
  errors.image = null;
  if (!values.text || values.text === '') {
    errors.text = 'Description is required';
  } else {
    errors.text = null;
  }
  errors.links = values.links.map(link => ({
    text: !link.text || link.text === '' ? 'Url description is required' : null,
    url: !link.url || link.url === '' ? 'Url is required' : null,
    icon: null
  }));
  return errors;
};

const LinksInput = props => {
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
      image: value.image,
      links: value.links.map(link => ({
        key: Date.now() + Math.random(),
        text: link.text,
        url: link.url,
        icon: link.icon
      }))
    },
    {
      text: null,
      image: null,
      links: value.links.map(() => ({
        text: null,
        url: null,
        icon: null
      }))
    },
    validation
  );

  const foundError = currentErrors => {
    const { text, image, links } = currentErrors;
    return (
      text !== null ||
      image !== null ||
      links.some(
        link => link.text !== null || link.url !== null || link.icon !== null
      )
    );
  };

  useEffect(() => {
    const hasNewError = foundError(errors);
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      text: values.text === '' ? 'Description' : values.text,
      image: values.image,
      links: values.links.map((link, index) => ({
        text: link.text === '' ? `#${index + 1} link text` : link.text,
        url: link.url === '' ? '#' : link.url,
        icon: link.icon
      }))
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
      label="Links Response"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      <InputBase
        fullWidth
        placeholder="Image url"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.image)}
        onChange={event => onChangeValue('image', event.target.value)}
        value={values.image}
      />
      <InputBase
        fullWidth
        multiline
        placeholder="Description (required)"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.text)}
        onChange={event => onChangeValue('text', event.target.value)}
        value={values.text}
      />
      {values.links.map((link, index) => (
        <div key={link.key}>
          <div className={classes.optionRoot}>
            <IconButton
              className={classes.iconButton}
              onClick={() => deleteArrayValue('links', index)}
            >
              <Delete fontSize="small" />
            </IconButton>
            <Divider className={classes.divider} />
            <InputBase
              fullWidth
              placeholder="Url (required)"
              onFocus={() => setFocus(true)}
              error={Boolean(errors.links[index].url)}
              onChange={event =>
                onChangeObjectValueArray(
                  'links',
                  index,
                  'url',
                  event.target.value
                )
              }
              value={link.url}
            />
          </div>
          <InputBase
            fullWidth
            placeholder="Url description (required)"
            classes={{ input: classes.hasLeftPaddingInput }}
            onFocus={() => setFocus(true)}
            error={Boolean(errors.links[index].text)}
            onChange={event =>
              onChangeObjectValueArray(
                'links',
                index,
                'text',
                event.target.value
              )
            }
            value={link.text}
          />
          <InputBase
            fullWidth
            placeholder="Icon url"
            classes={{ input: classes.hasLeftPaddingInput }}
            onFocus={() => setFocus(true)}
            error={Boolean(errors.links[index].icon)}
            onChange={event =>
              onChangeObjectValueArray(
                'links',
                index,
                'icon',
                event.target.value
              )
            }
            value={link.icon}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'links',
            { key: Date.now() + Math.random(), text: '', url: '', icon: '' },
            { text: null, url: null, icon: null }
          )
        }
      >
        Add Link
      </Button>
    </ResponseContainer>
  );
};

LinksInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(LinksInput);
