import { useRef } from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import FormHelperText from '@material-ui/core/FormHelperText';
import getColor from '../IntentEditor/getColor';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  const { onChange } = props;
  return values => {
    onChange(values.name);
  };
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Param name is required';
  }
  return errors;
};

const ParamEditor = props => {
  const { initialValue, classes, onDelete } = props;
  const { form, handleSubmit } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      name: initialValue.name || initialValue.entity.title
    },
    validate
  });
  const name = useField('name', form);
  const {
    input: { onBlur, ...restInput },
    meta
  } = name;

  const inputRef = useRef(null);

  return (
    <Paper className={classes.root} elevation={0}>
      <div
        className={classes.color}
        style={{ backgroundColor: getColor(initialValue.key) }}
      >
        {' '}
      </div>
      <div className={classes.inputContainer}>
        <Grid container alignItems="center">
          <Grid item md={7} className={classes.paddingRight}>
            <TextField
              inputRef={inputRef}
              label="Parameter Name"
              margin="dense"
              variant="outlined"
              fullWidth
              {...restInput}
              onBlur={event => {
                onBlur(event);
                handleSubmit(event);
              }}
              error={meta.touched && isTypeOfString(meta.error)}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              label="Entity Title"
              fullWidth
              defaultValue={initialValue.entity.title}
              margin="dense"
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        {meta.touched && isTypeOfString(meta.error) && (
          <FormHelperText margin="dense" error>
            {meta.touched && meta.error}
          </FormHelperText>
        )}
      </div>
      <div className={classes.buttonContainer}>
        <IconButton onClick={onDelete} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

ParamEditor.defaultProps = {
  initialValue: {
    entity: {}
  }
};

ParamEditor.propTypes = {
  initialValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(ParamEditor);
