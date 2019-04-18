import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Face from '@material-ui/icons/Face';
import { withRouter } from 'next/router';
import IntentSuggestions from '../IntentSuggestions';
import SimpleAutoComplete from '../SimpleAutoComplete';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return values => {
    props.send(values);
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
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      intent: ''
    },
    validate
  });
  const title = useField('title', form);
  const intent = useField('intent', form);
  const { classes, preview, router } = props;
  const { projectId } = router.query;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={classes.inputContainer}>
          <div className={classes.preview}>{preview()}</div>
          <Grid container spacing={6}>
            <Grid
              item
              xs
              className={`${classes.margin} ${classes.noRightMargin}`}
            >
              <TextField
                autoFocus
                label="Title"
                margin="dense"
                variant="outlined"
                fullWidth
                InputProps={title.input}
                error={title.meta.touched && isTypeOfString(title.meta.error)}
              />
            </Grid>
            <Grid item xs className={classes.margin}>
              <SimpleAutoComplete
                input={intent.input}
                label="Intent"
                error={intent.meta.touched && isTypeOfString(intent.meta.error)}
                suggestions={(inputValue, children) => {
                  return (
                    <IntentSuggestions
                      projectId={projectId}
                      keyword={inputValue}
                    >
                      {children}
                    </IntentSuggestions>
                  );
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={prestine || submitting}
          >
            <Face />
            <Send />
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
  send: PropTypes.func.isRequired,
  preview: PropTypes.func
};

export default withStyles(style)(withRouter(UserDialogInput));
