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

const Setting = props => {
  const { projectId, classes, settingType } = props;
  const settingMenu = [
    { name: 'General', type: 'general' },
    { name: 'Backup', type: 'backup' }
  ];

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
      {SettingProduct !== null && <SettingProduct projectId={projectId} />}
    </LayoutProvider>
  );
};

Setting.defaultProps = {
  settingType: null
};

Setting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  settingType: PropTypes.string
};

export default withStyles(style)(Setting);
