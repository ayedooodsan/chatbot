import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import ProductHead from '../../layout/ProductHead';
import ProductBody from '../../layout/ProductBody';
import connect from './store';
import style from './style';
import redirect from '../../../libraries/redirect';

const IntentProduct = props => {
  const {
    projectId,
    intentId,
    updateIntent,
    deleteIntent,
    intent,
    classes
  } = props;
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
            generateFormList={() => {
              return values.map((value, index) => (
                <Paper className={classes.root} elevation={1} key={value}>
                  <InputBase
                    value={value}
                    onChange={event =>
                      onChangeValues(event.target.value, index)
                    }
                    autoFocus
                    fullWidth
                    className={classes.input}
                    placeholder="User says"
                  />
                  <IconButton
                    onClick={() => onDeleteValue(index)}
                    className={classes.iconButton}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ));
            }}
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
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  intentId: PropTypes.string.isRequired,
  updateIntent: PropTypes.func.isRequired,
  deleteIntent: PropTypes.func.isRequired,
  intent: PropTypes.object
};

export default withStyles(style)(connect(IntentProduct));
