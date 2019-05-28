import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Warning from '@material-ui/icons/Warning';
import FileCopy from '@material-ui/icons/FileCopy';
import Clipboard from 'react-clipboard.js';
import SimpleAutoComplete from './SimpleAutoComplete';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';
import connect from './store';

const onSubmit = props => {
  const { updateProject, projectId } = props;
  return values => {
    updateProject({
      id: projectId,
      ...values
    });
  };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  return errors;
};

const GeneralSetting = props => {
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
  const { classes, projectId, project, languages, timeZones } = props;
  const { form, handleSubmit } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      ...project
    },
    validate
  });
  const title = useField('title', form);
  const description = useField('description', form);
  const timeZone = useField('timeZone', form);
  const language = useField('language', form);
  return (
    <SimpleProductLayoutProvider
      header={() => (
        <SimpleProductHead
          title="General Setting"
          renderButtons={() => (
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.whiteColor}
              >
                Save
              </Button>
            </div>
          )}
        />
      )}
      product={() => (
        <SimpleProductBody>
          <React.Fragment>
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
                  readOnly
                  variant="outlined"
                />
                <Clipboard
                  onSuccess={() => setCopyTooltipOpen(true)}
                  component="div"
                  data-clipboard-text={projectId}
                >
                  <Tooltip
                    onClose={() => setCopyTooltipOpen(false)}
                    open={copyTooltipOpen}
                    title="Copied"
                    placement="left"
                  >
                    <IconButton className={classes.button}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                </Clipboard>
              </Paper>
            </div>
            <div className={classes.container}>
              <Typography variant="subtitle2" gutterBottom>
                Project name
              </Typography>
              <Paper
                style={
                  title.meta.touched && isTypeOfString(title.meta.error)
                    ? {
                        border: '1px solid red'
                      }
                    : {}
                }
                className={classes.fieldRoot}
                elevation={1}
              >
                <InputBase
                  placeholder="Project name"
                  fullWidth
                  className={classes.input}
                  {...title.input}
                />
              </Paper>
              {title.meta.touched && isTypeOfString(title.meta.error) && (
                <FormHelperText margin="dense" error>
                  {title.meta.touched && title.meta.error}
                </FormHelperText>
              )}
            </div>
            <div className={classes.container}>
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>
              <Paper
                style={
                  description.meta.touched &&
                  isTypeOfString(description.meta.error)
                    ? {
                        border: '1px solid red'
                      }
                    : {}
                }
                className={classes.fieldRoot}
                elevation={1}
              >
                <InputBase
                  rows="3"
                  multiline
                  placeholder="Description"
                  fullWidth
                  className={classes.input}
                  {...description.input}
                />
              </Paper>
              {description.meta.touched &&
                isTypeOfString(description.meta.error) && (
                  <FormHelperText margin="dense" error>
                    {description.meta.touched && description.meta.error}
                  </FormHelperText>
                )}
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item md>
                  <div className={classes.container}>
                    <Typography variant="subtitle2" gutterBottom>
                      Time Zone
                    </Typography>
                    <Paper
                      style={
                        timeZone.meta.touched &&
                        isTypeOfString(timeZone.meta.error)
                          ? {
                              border: '1px solid red'
                            }
                          : {}
                      }
                      className={classes.fieldRoot}
                      elevation={1}
                    >
                      <SimpleAutoComplete
                        key={project.timeZone}
                        className={classes.timeZone}
                        onChange={timeZone.input.onChange}
                        placeholder="Time zone"
                        initialInputValue={project.timeZone}
                        initialValue={project.timeZone}
                        suggestions={inputValue => {
                          return timeZones
                            .filter(
                              timeZoneOption =>
                                timeZoneOption.search(
                                  RegExp(inputValue || '', 'i')
                                ) !== -1
                            )
                            .splice(0, 10);
                        }}
                      />
                    </Paper>
                    {timeZone.meta.touched &&
                      isTypeOfString(timeZone.meta.error) && (
                        <FormHelperText margin="dense" error>
                          {timeZone.meta.touched && timeZone.meta.error}
                        </FormHelperText>
                      )}
                  </div>
                </Grid>
                <Grid item md>
                  <div className={classes.container}>
                    <Typography variant="subtitle2" gutterBottom>
                      Language
                    </Typography>
                    <Paper
                      style={
                        language.meta.touched &&
                        isTypeOfString(language.meta.error)
                          ? {
                              border: '1px solid red'
                            }
                          : {}
                      }
                      className={classes.fieldRoot}
                      elevation={1}
                    >
                      <RadioGroup
                        className={classes.rowGroup}
                        row
                        value={language.input.value}
                        onChange={event =>
                          language.input.onChange(event.target.value)
                        }
                      >
                        {languages.map(languageOption => (
                          <FormControlLabel
                            key={languageOption.value}
                            value={languageOption.value}
                            control={<Radio color="primary" />}
                            label={languageOption.label}
                            labelPlacement="end"
                          />
                        ))}
                      </RadioGroup>
                    </Paper>
                    {language.meta.touched &&
                      isTypeOfString(language.meta.error) && (
                        <FormHelperText margin="dense" error>
                          {language.meta.touched && language.meta.error}
                        </FormHelperText>
                      )}
                  </div>
                </Grid>
              </Grid>
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
          </React.Fragment>
        </SimpleProductBody>
      )}
      onSave={handleSubmit}
    />
  );
};

GeneralSetting.defaultProps = {
  project: {},
  languages: [],
  timeZones: []
};

GeneralSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  languages: PropTypes.array,
  timeZones: PropTypes.array,
  project: PropTypes.object
};

export default withStyles(style)(connect(GeneralSetting));
