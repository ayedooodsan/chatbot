import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import SubNavigation from '../layout/SubNavigation';
import { Link } from '../../routes';
import style from './style';
import GeneralSetting from './GeneralSetting';
import BackupSetting from './BackupSetting';
import ShareSetting from './ShareSetting';
import connect from './store';

const Setting = props => {
  const { projectId, classes, settingType, role } = props;
  const settingMenu = [
    { name: 'General', type: 'general' },
    { name: 'Backup', type: 'backup' }
  ];

  if (role === 'Admin') {
    settingMenu.push({ name: 'Share', type: 'share' });
  }

  const activeSettingType = currentSettingType =>
    currentSettingType === settingType;

  const generateSettingProduct = () => {
    let SettingProduct = null;
    switch (settingType) {
      case 'general': {
        SettingProduct = GeneralSetting;
        break;
      }
      case 'backup': {
        SettingProduct = BackupSetting;
        break;
      }
      case 'share': {
        SettingProduct = ShareSetting;
        break;
      }
      default: {
        break;
      }
    }
    return SettingProduct;
  };

  const SettingProduct = generateSettingProduct();

  return (
    <LayoutProvider
      navigation={() => <Navigation />}
      subNavigation={() => (
        <SubNavigation
          noHeader
          header={() => null}
          body={() => (
            <List component="nav">
              {settingMenu.map(currentSetting => (
                <Link
                  route={`/${projectId}/setting/${currentSetting.type}`}
                  key={currentSetting.type}
                >
                  <ListItem
                    className={classNames({
                      [classes.listItemActive]: activeSettingType(
                        currentSetting.type
                      )
                    })}
                    button
                  >
                    <ListItemText
                      primary={currentSetting.name}
                      primaryTypographyProps={{
                        variant: 'body2',
                        className: classNames({
                          [classes.listItemTextActive]: activeSettingType(
                            currentSetting.type
                          )
                        })
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          )}
        />
      )}
    >
      {SettingProduct !== null && (
        <SettingProduct projectId={projectId} role={role} />
      )}
    </LayoutProvider>
  );
};

Setting.defaultProps = {
  settingType: null,
  role: 'Collaborator'
};

Setting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  role: PropTypes.string,
  settingType: PropTypes.string
};

export default withStyles(style)(connect(Setting));
