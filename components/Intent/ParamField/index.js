import { useForm, useField } from 'react-final-form-hooks';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  const { onChange } = props;
  return values => {
    onChange(values.name, 'name');
  };
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Param name is required';
  }
  return errors;
};

const ParamField = props => {
  const { initialValue, classes } = props;
  const { form, handleSubmit } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      name: initialValue.name
    },
    validate
  });
  const name = useField('name', form);
  const {
    input: { onBlur, ...restInput },
    meta
  } = name;
  return (
    <div className={classes.root}>
      <div className={classes.color}>Cek</div>
      <div className={classes.inputContainer}>
        <Grid container alignItems="center">
          <Grid item md={7}>
            <TextField
              label="Param Name"
              margin="dense"
              variant="outlined"
              fullWidth
              helperText={meta.touched && meta.error}
              {...restInput}
              onBlur={event => {
                onBlur(event);
                handleSubmit(event);
              }}
              error={meta.touched && isTypeOfString(meta.error)}
            />
          </Grid>
          <Grid item md={5}>
            <Typography variant="subtitle2">
              {initialValue.entity.title}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.buttonContainer}>Cek</div>
    </div>
  );
};

ParamField.defaultProps = {
  initialValue: {
    entity: {}
  }
};

ParamField.propTypes = {
  initialValue: PropTypes.object,
  onChange: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(ParamField);
