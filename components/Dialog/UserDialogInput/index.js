import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'next/router';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IntentSuggestions from '../../common/IntentSuggestions';
import SimpleAutoComplete from '../SimpleAutoComplete';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';
import { EDIT_USER } from '../DialogInput/constant';

const onSubmit = props => {
  return values => {
    props.send({
      ...values,
      title: values.title.replace(/[^a-zA-Z\d\s-_]/, '')
    });
  };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.intent) {
    errors.intent = 'Intent is required';
  }
  return errors;
};

const UserDialogInput = props => {
  const { classes, preview, router, payload, type } = props;
  const { projectId } = router.query;
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      intent: type === EDIT_USER ? payload.intent : null,
      title: type === EDIT_USER ? payload.title : null,
      params:
        type === EDIT_USER
          ? payload.params.reduce((paramString, param) => {
              return paramString + (param.required ? `|${param.name}|` : '');
            }, '')
          : ''
    },
    validate
  });

  const title = useField('title', form);
  const intent = useField('intent', form);
  const params = useField('params', form);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={classes.inputContainer}>
          <div className={classes.preview}>{preview()}</div>
          <TextField
            autoFocus
            label="Title"
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={title.input}
            error={title.meta.touched && isTypeOfString(title.meta.error)}
          />
          <SimpleAutoComplete
            input={{
              ...intent.input,
              onChange: event => {
                intent.input.onChange(event);
                params.input.onChange('');
              }
            }}
            label="Linked Intent"
            initialValue={type === EDIT_USER ? payload.intent : {}}
            initialInputValue={type === EDIT_USER ? payload.intent.title : null}
            error={intent.meta.touched && isTypeOfString(intent.meta.error)}
            suggestions={(inputValue, children) => {
              return (
                <IntentSuggestions projectId={projectId} keyword={inputValue}>
                  {children}
                </IntentSuggestions>
              );
            }}
          />
          {_.isObject(intent.input.value) &&
            (_.isEqual(intent.input.value, payload.intent)
              ? payload.params.length > 0 && (
                  <div className={classes.preview}>
                    <Typography
                      variant="caption"
                      className={classes.checkboxLabel}
                    >
                      Required Params
                    </Typography>
                    <FormGroup row className={classes.checkboxes}>
                      {payload.params.map(param => (
                        <FormControlLabel
                          key={param.name}
                          control={
                            <Checkbox
                              color="primary"
                              id={param.name}
                              checked={params.input.value.includes(
                                `|${param.name}|`
                              )}
                              onChange={(event, checked) => {
                                let currentValue = params.input.value;
                                if (checked) {
                                  currentValue += `|${param.name}|`;
                                } else {
                                  currentValue = currentValue.replace(
                                    `|${param.name}|`,
                                    ''
                                  );
                                }
                                params.input.onChange(currentValue);
                              }}
                            />
                          }
                          label={param.name}
                        />
                      ))}
                    </FormGroup>
                  </div>
                )
              : intent.input.value.params.length > 0 && (
                  <div className={classes.preview}>
                    <Typography
                      variant="caption"
                      className={classes.checkboxLabel}
                    >
                      Required Params
                    </Typography>
                    <FormGroup row className={classes.checkboxes}>
                      {intent.input.value.params.map(param => (
                        <FormControlLabel
                          key={param.name}
                          control={
                            <Checkbox
                              color="primary"
                              id={param.name}
                              checked={params.input.value.includes(param.name)}
                              onChange={(event, checked) => {
                                let currentValue = params.input.value;
                                if (checked) {
                                  currentValue += `|${param.name}|`;
                                } else {
                                  currentValue.replace(`|${param.name}|`, '');
                                }
                                params.input.onChange(currentValue);
                              }}
                            />
                          }
                          label={param.name}
                        />
                      ))}
                    </FormGroup>
                  </div>
                ))}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            disabled={prestine || submitting}
          >
            User Send Message
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

UserDialogInput.defaultProps = {
  preview: () => null
};

UserDialogInput.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  preview: PropTypes.func
};

export default withStyles(style)(withRouter(UserDialogInput));
