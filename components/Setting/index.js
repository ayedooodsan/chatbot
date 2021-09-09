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
import NLPEngineSetting from './NLPEngineSetting';
import LogSetting from './LogSetting';
import RawHistorySetting from './RawHistorySetting';
import ResetPassword from './ResetPassword';
import QisqusIntegration from './QisqusIntegration';
import connect from './store';

const Setting = props => {
  const { projectId, classes, settingType, role, username } = props;
  const settingMenu = [
    { name: 'General', type: 'general' },
    { name: 'Backup', type: 'backup' },
    { name: 'Raw History', type: 'rawHistory' }
  ];

  if (role === 'Admin') {
    settingMenu.push({ name: 'Share', type: 'share' });
    settingMenu.push({
      name: 'Qisqus Integration',
      type: 'qisqusIntegration'
    });
  }

  if (username === 'kalina') {
    settingMenu.push({
      name: 'NLP Engine',
      type: 'nlpIntegration'
    });
    settingMenu.push({
      name: 'Log Engine',
      type: 'logIntegration'
    });
    settingMenu.push({
      name: 'Reset Password',
      type: 'resetPassword'
    });
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
      case 'nlpIntegration': {
        SettingProduct = NLPEngineSetting;
        break;
      }
      case 'logIntegration': {
        SettingProduct = LogSetting;
        break;
      }
      case 'rawHistory': {
        SettingProduct = RawHistorySetting;
        break;
      }
      case 'resetPassword': {
        SettingProduct = ResetPassword;
        break;
      }
      case 'qisqusIntegration': {
        SettingProduct = QisqusIntegration;
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
  role: 'Collaborator',
  username: ''
};

Setting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  role: PropTypes.string,
  username: PropTypes.string,
  settingType: PropTypes.string
};

export default withStyles(style)(connect(Setting));
