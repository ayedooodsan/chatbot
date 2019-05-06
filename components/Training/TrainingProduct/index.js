import React from 'react';
import PropTypes from 'prop-types';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import connect from './store';
import TrainingField from '../TrainingField';
import redirect from '../../../libraries/redirect';

const TrainingProduct = props => {
  const {
    projectId,
    trainingId,
    updateTraining,
    deleteTraining,
    training
  } = props;
  const onSave = getTrainingProduct => {
    return () => {
      const trainingFilter = trainingEntry =>
        trainingEntry.keyword !== '' && trainingEntry.synonyms.length !== 0;
      const { title, productValues } = getTrainingProduct(trainingFilter);
      updateTraining({
        id: trainingId,
        title,
        values: productValues.map(value => ({
          keyword: value.keyword,
          synonyms: value.synonyms
        }))
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
      id={trainingId}
      title={training.title}
      productValues={training.userSays}
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
      product={(values, onChangeValues, onAddIntialValue, onDeleteValue) => {
        return (
          <ProductBody
            noAdd
            values={values}
            onChangeValues={onChangeValues}
            onDeleteValue={onDeleteValue}
            generateForm={(
              value,
              onChangeCurrentValue,
              onDeleteCurrentValue,
              index
            ) => (
              <TrainingField
                number={index + 1}
                initialValue={value}
                onChange={onChangeCurrentValue}
                onDelete={() => {
                  onDeleteCurrentValue();
                }}
              />
            )}
            addFormList={onAdd(onAddIntialValue)}
          />
        );
      }}
    />
  );
};

TrainingProduct.defaultProps = {
  training: {}
};

TrainingProduct.propTypes = {
  projectId: PropTypes.string.isRequired,
  trainingId: PropTypes.string.isRequired,
  updateTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  training: PropTypes.object
};

export default connect(TrainingProduct);
