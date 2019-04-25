import React from 'react';
import PropTypes from 'prop-types';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import SubProductBody from '../../layout/SubProductBody';
import connect from './store';
import IntentField from '../IntentField';
import ParamField from '../ParamField';
import redirect from '../../../libraries/redirect';

const IntentProduct = props => {
  const { projectId, intentId, updateIntent, deleteIntent, intent } = props;
  const onSave = getIntentProduct => {
    return () => {
      const { title, values } = getIntentProduct();
      updateIntent({ id: intentId, title, values });
    };
  };

  const onDelete = async () => {
    const response = await deleteIntent({ id: intentId });
    redirect({}, `/${projectId}/entity`);
    return response;
  };

  const onAdd = onAddIntialValue => {
    return () => {
      onAddIntialValue('');
    };
  };

  const onAddParam = onAddIntialValue => {
    return () => {
      onAddIntialValue('');
    };
  };

  return (
    <ProductLayoutProvider
      id={intentId}
      title={intent.title}
      productValues={intent.values}
      subProductValues={intent.params}
      header={(onChangeTitle, intentTitle, getIntentProduct) => {
        return (
          <ProductHead
            productName={intentTitle}
            deleteMessage={`Delete ${intentTitle} Intent`}
            deleteSubMessage="To delete this intent, please enter the first word on intent title."
            onChange={onChangeTitle}
            onSave={onSave(getIntentProduct)}
            onDelete={onDelete}
            projectId={projectId}
            autoFocus
          />
        );
      }}
      product={(values, onChangeValues, onAddIntialValue, onDeleteValue) => {
        return (
          <ProductBody
            values={values}
            onChangeValues={onChangeValues}
            onDeleteValue={onDeleteValue}
            generateForm={(
              value,
              onChangeCurrentValue,
              onDeleteCurrentValue
            ) => (
              <IntentField
                initialValue={value}
                onChange={onChangeCurrentValue}
                onDelete={onDeleteCurrentValue}
              />
            )}
            addFormList={onAdd(onAddIntialValue)}
          />
        );
      }}
      subProduct={(values, onChangeValues, onAddIntialValue, onDeleteValue) => (
        <SubProductBody
          values={values}
          onChangeValues={onChangeValues}
          onDeleteValue={onDeleteValue}
          generateForm={(value, onChangeParam, onDeleteParam) => (
            <ParamField
              initialValue={value}
              onChange={onChangeParam}
              onDelete={onDeleteParam}
            />
          )}
          addFormList={onAddParam(onAddIntialValue)}
        />
      )}
    />
  );
};

IntentProduct.defaultProps = {
  intent: {}
};

IntentProduct.propTypes = {
  projectId: PropTypes.string.isRequired,
  intentId: PropTypes.string.isRequired,
  updateIntent: PropTypes.func.isRequired,
  deleteIntent: PropTypes.func.isRequired,
  intent: PropTypes.object
};

export default connect(IntentProduct);
