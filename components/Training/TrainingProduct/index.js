import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import connect from './store';
import style from './style';
import TrainingField from '../TrainingField';
import redirect from '../../../libraries/redirect';

const TrainingProduct = props => {
  const {
    projectId,
    trainingId,
    approveTraining,
    deleteTraining,
    classes,
    training
  } = props;

  const [showType, setShowType] = useState({
    predicted: true,
    knownSuggestion: true,
    unknownSuggestion: true
  });

  const isShow = type => {
    if (type === 'predicted') {
      return showType.predicted;
    }
    if (type === 'knownSuggestion') {
      return showType.knownSuggestion;
    }
    if (type === 'unknown-suggestion') {
      return showType.unknownSuggestion;
    }
  };

  const handleOnchangeTypeFilter = name => event => {
    setShowType({
      ...showType,
      [name]: event.target.checked
    });
  };

  const onSave = getTrainingProduct => {
    return () => {
      const trainingFilter = trainingEntry => trainingEntry.text !== '';
      const { title, productValues } = getTrainingProduct(trainingFilter);
      approveTraining({
        id: trainingId,
        title,
        userSays: productValues.map(userSay => {
          const {
            text,
            entityRanges,
            params,
            intentResult,
            actionStatus
          } = userSay;
          return {
            text,
            entityRanges: entityRanges.map(entityRange => ({
              offset: entityRange.offset,
              length: entityRange.length,
              paramKey: entityRange.paramKey
            })),
            params: params.map(param => ({
              name: param.name,
              entityId: param.entity.id,
              key: param.key
            })),
            intentResultTitle:
              intentResult === null ? null : intentResult.title,
            actionStatus
          };
        })
      });
    };
  };

  const onDelete = async () => {
    const response = await deleteTraining({ id: trainingId });
    redirect({}, `/${projectId}/training`);
    return response;
  };

  const onAdd = onAddIntialValue => {
    return () => {
      onAddIntialValue({
        keyword: '',
        synonyms: [],
        key: Math.random()
      });
    };
  };

  return (
    <ProductLayoutProvider
      key={training.userSays.length}
      id={trainingId}
      title={training.title}
      productValues={training.userSays}
      filterCondition={showType}
      header={(onChangeTitle, trainingTitle, getTrainingProduct) => {
        return (
          <ProductHead
            productName={trainingTitle}
            deleteMessage={`Delete ${trainingTitle} Training`}
            deleteSubMessage="To delete this training, please enter the first word on training title."
            onChange={onChangeTitle}
            onSave={onSave(getTrainingProduct)}
            onDelete={onDelete}
            projectId={projectId}
            autoFocus
          />
        );
      }}
      product={(
        values,
        onChangeValues,
        onAddIntialValue,
        onDeleteValue,
        updateLocalIntentsFromTraining,
        localIntents
      ) => {
        return (
          <ProductBody
            noAdd
            values={values}
            onChangeValues={onChangeValues}
            onDeleteValue={onDeleteValue}
            filterFunc={isShow}
            topMenu={() => (
              <Grid container>
                <Grid item xs>
                  <Typography variant="subtitle2">Statistics: </Typography>
                  <Typography variant="caption">
                    Predicted: {training.request - training.noMatch} &
                    Unpredicted: {training.noMatch} (Known Suggestion:{' '}
                    {training.noMatch - training.unknownSuggestion} & Unknown
                    Suggestion: {training.unknownSuggestion}).
                  </Typography>
                </Grid>
                <Grid item container xs justify="flex-end">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showType.predicted}
                          onChange={handleOnchangeTypeFilter('predicted')}
                          color="primary"
                        />
                      }
                      label="Predicted"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showType.knownSuggestion}
                          onChange={handleOnchangeTypeFilter('knownSuggestion')}
                          color="secondary"
                        />
                      }
                      label="Known Suggestion"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showType.unknownSuggestion}
                          onChange={handleOnchangeTypeFilter(
                            'unknownSuggestion'
                          )}
                          classes={{
                            checked: classes.redCheckboxChecked
                          }}
                        />
                      }
                      label="Unknown Suggestion"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            )}
            generateForm={(
              value,
              onChangeCurrentValue,
              onDeleteCurrentValue,
              index
            ) =>
              isShow(value.type) ? (
                <TrainingField
                  number={index + 1}
                  initialValue={value}
                  onChange={onChangeCurrentValue}
                  localIntents={localIntents}
                  updateLocalIntentsFromTraining={
                    updateLocalIntentsFromTraining
                  }
                  onDelete={() => {
                    onDeleteCurrentValue();
                  }}
                />
              ) : null
            }
            addFormList={onAdd(onAddIntialValue)}
          />
        );
      }}
    />
  );
};

TrainingProduct.defaultProps = {
  training: {
    userSays: []
  }
};

TrainingProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  trainingId: PropTypes.string.isRequired,
  updateTraining: PropTypes.func.isRequired,
  approveTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  training: PropTypes.object
};

export default connect(withStyles(style)(TrainingProduct));
