import React from 'react';
import PropTypes from 'prop-types';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import connect from './store';
import EntityField from '../EntityField';
import redirect from '../../../libraries/redirect';

const EntityProduct = props => {
  const { projectId, entityId, updateEntity, deleteEntity, entity } = props;
  const onSave = getEntityProduct => {
    return () => {
      const entityFilter = entityEntry =>
        entityEntry.keyword !== '' && entityEntry.synonyms.length !== 0;
      const { title, productValues } = getEntityProduct(entityFilter);
      updateEntity({
        id: entityId,
        title,
        values: productValues.map(value => ({
          keyword: value.keyword,
          synonyms: value.synonyms
        }))
      });
    };
  };

  const onDelete = async () => {
    const response = await deleteEntity({ id: entityId });
    redirect({}, `/${projectId}/entity`);
    return response;
  };

  const onAdd = onAddIntialValue => {
    return () => {
      onAddIntialValue({
        keyword: '',
        synonyms: []
      });
    };
  };

  return (
    <ProductLayoutProvider
      id={entityId}
      title={entity.title}
      productValues={entity.values}
      header={(onChangeTitle, entityTitle, getEntityProduct) => {
        return (
          <ProductHead
            productName={entityTitle}
            deleteMessage={`Delete ${entityTitle} Entity`}
            deleteSubMessage="To delete this entity, please enter the first word on entity title."
            onChange={onChangeTitle}
            onSave={onSave(getEntityProduct)}
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
              <EntityField
                initialValue={value}
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

EntityProduct.defaultProps = {
  entity: {}
};

EntityProduct.propTypes = {
  projectId: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  updateEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  entity: PropTypes.object
};

export default connect(EntityProduct);
