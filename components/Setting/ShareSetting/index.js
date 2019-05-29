import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import style from './style';
import ProductLayoutProvider from '../../layout/ProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import ProductBody from '../../layout/ProductBody';
import ShareField from './ShareField';
import connect from './store';

const ShareSetting = props => {
  const { projectId, inviteUsers, invitedUsers, classes } = props;
  const onSave = getInvitedUsers => {
    return () => {
      const invitedUserFilter = invitedUserEntry =>
        !_.isEqual(invitedUserEntry, {});
      const { productValues } = getInvitedUsers(invitedUserFilter);
      inviteUsers({
        id: projectId,
        userIds: _.uniq(productValues.map(value => value.id))
      });
    };
  };

  const onAdd = onAddIntialValue => {
    return () => {
      onAddIntialValue({
        key: Math.random()
      });
    };
  };

  return (
    <ProductLayoutProvider
      key={invitedUsers.length}
      productValues={invitedUsers}
      header={(onChangeTitle, title, getInvitedUsers) => {
        return (
          <SimpleProductHead
            title="Share Setting"
            renderButtons={() => (
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={onSave(getInvitedUsers)}
                  className={classes.whiteColor}
                >
                  Save
                </Button>
              </div>
            )}
          />
        );
      }}
      product={(values, onChangeValues, onAddIntialValue, onDeleteValue) => {
        return (
          <ProductBody
            values={values}
            onChangeValues={onChangeValues}
            onDeleteValue={onDeleteValue}
            buttonText="Invite New User"
            generateForm={(
              value,
              onChangeCurrentValue,
              onDeleteCurrentValue
            ) => (
              <ShareField
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

ShareSetting.defaultProps = {
  invitedUsers: []
};

ShareSetting.propTypes = {
  projectId: PropTypes.string.isRequired,
  inviteUsers: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  invitedUsers: PropTypes.array
};

export default withStyles(style)(connect(ShareSetting));
