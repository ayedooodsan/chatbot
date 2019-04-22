import React from 'react';
import PropTypes from 'prop-types';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import connect from './store';
import IntentField from '../IntentField';
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
    redirect({}, `/${projectId}/intent`);
    return response;
  };

  const onAdd = onAddIntialValue => {
    return () => {
      onAddIntialValue('');
    };
  };

  return (
    <ProductLayoutProvider
      id={intentId}
      title={intent.title}
      values={intent.values}
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
      body={(values, onChangeValues, onAddIntialValue, onDeleteValue) => {
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
                intialValue={value}
                onChange={onChangeCurrentValue}
                onDelete={onDeleteCurrentValue}
              />
            )}
            addFormList={onAdd(onAddIntialValue)}
          />
        );
      }}
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
