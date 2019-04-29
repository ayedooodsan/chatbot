import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Warning from '@material-ui/icons/Warning';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return values => {
    console.log(props);
    console.log(values);
  };
};

const validate = values => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const GeneralSetting = props => {
  const { classes, projectId, project } = props;
  const { form, handleSubmit } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      title: project.title
    },
    validate
  });
  const title = useField('title', form);
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="General Setting" />}
      product={() => (
        <SimpleProductBody>
          <div className={classes.container}>
            <Typography variant="subtitle2" gutterBottom>
              Project id
            </Typography>
            <Paper className={classes.fieldRoot} elevation={1}>
              <InputBase
                placeholder="ProjectId"
                defaultValue={projectId}
                fullWidth
                className={classes.input}
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography variant="subtitle2" gutterBottom>
              Project name
            </Typography>
            <Paper className={classes.fieldRoot} elevation={1}>
              <InputBase
                placeholder="Project name"
                fullWidth
                className={classes.input}
                helperText={title.meta.touched && title.meta.error}
                {...title.input}
                error={title.meta.touched && isTypeOfString(title.meta.error)}
              />
            </Paper>
          </div>
          <div className={classes.container}>
            <Paper className={classes.verticalContainer} elevation={1}>
              <Warning className={classes.icon} />
              <Typography variant="subtitle2" gutterBottom>
                Danger Zone
              </Typography>
              <Typography variant="body1" gutterBottom>
                This action cannot be undone. Be careful
              </Typography>
              <Button variant="outlined">Delete</Button>
            </Paper>
          </div>
        </SimpleProductBody>
      )}
      onSave={handleSubmit}
    />
  );
};

GeneralSetting.defaultProps = {
  project: {}
};

GeneralSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  project: PropTypes.object
};

export default withStyles(style)(GeneralSetting);
