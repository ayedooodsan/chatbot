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
    replies: values.replies.map(reply => {
      if (!reply.value || reply.value === '') {
        return { value: 'Reply name is required' };
      }
      return { value: null };
    })
  };
  return errors;
};

const QuickReplyInput = props => {
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
      replies: value.replies.map(reply => ({
        key: Date.now() + Math.random(),
        value: reply
      }))
    },
    {
      title: null,
      replies: value.replies.map(() => ({
        value: null
      }))
    },
    validation
  );

  useEffect(() => {
    const hasNewError =
      errors.replies.some(reply => reply.value !== null) && errors.title;
    setHasError(hasNewError);
  }, [errors]);

  useEffect(() => {
    onChange({
      title: values.title || 'Title',
      replies: values.replies.map((reply, index) =>
        reply.value === '' ? `#${index + 1} reply` : reply.value
      )
    });
  }, [values]);

  const onClickAway = () => {
    const { errors: newError } = onSubmit();
    const hasNewError =
      newError.replies.some(reply => reply.value !== null) && errors.title;
    setHasError(hasNewError);
    setFocus(false);
  };

  return (
    <ResponseContainer
      label="Quick Reply"
      focus={focus}
      error={hasError}
      onClickAway={onClickAway}
    >
      <InputBase
        fullWidth
        placeholder="Title (required)"
        onFocus={() => setFocus(true)}
        error={Boolean(errors.title)}
        onChange={event => onChangeValue('title', event.target.value)}
        value={values.title}
      />
      {values.replies.map((reply, index) => (
        <div key={reply.key} className={classes.suggestionRoot}>
          <IconButton
            className={classes.iconButton}
            onClick={() => deleteArrayValue('replies', index)}
          >
            <Delete fontSize="small" />
          </IconButton>
          <Divider className={classes.divider} />
          <InputBase
            fullWidth
            placeholder="Reply name (required)"
            onFocus={() => setFocus(true)}
            error={Boolean(errors.replies[index].value)}
            onChange={event =>
              onChangeObjectValueArray(
                'replies',
                index,
                'value',
                event.target.value
              )
            }
            value={reply.value}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          addArrayValue(
            'replies',
            { key: Date.now() + Math.random(), value: '' },
            { value: null }
          )
        }
      >
        Add Reply
      </Button>
    </ResponseContainer>
  );
};

QuickReplyInput.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(style)(QuickReplyInput);
