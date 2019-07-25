import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Reply from '@material-ui/icons/Reply';
import _ from 'lodash';
import MessageView from './MessageView';
import platformOptions from '../RobotDialogInput/const';
import BubbleChat from '../../common/BubbleChat';
import style from './style';
import { REPLY_ROBOT, EDIT_ROBOT, DELETE_ROBOT } from '../DialogInput/constant';

const RobotMessage = props => {
  const { classes, onChangeDialogInput, messages, selected } = props;
  const activeMessage = messages[0];
  const { payload } = activeMessage;
  const payloadGroup = _.groupBy(payload, el => el.platform);
  const platforms = Object.keys(payloadGroup);
  const [activePlatform, setActivePlatform] = useState(platforms[0]);
  const [chats, setChats] = useState(payloadGroup[activePlatform]);
  const completePlatformOptions = [
    { value: 'zoho', label: 'Zoho' },
    ...platformOptions
  ];

  useEffect(() => {
    setActivePlatform(platforms[0]);
    setChats(payloadGroup[platforms[0]]);
  }, [messages]);

  useEffect(() => {
    setChats(payloadGroup[activePlatform]);
  }, [activePlatform]);

  return (
    <React.Fragment>
      {platforms && platforms.length > 1 && (
        <div
          className={classNames(classes.chipContainer, {
            [classes.selectedChipContainer]: selected
          })}
        >
          {platforms.map(platform =>
            platform === activePlatform ? (
              <Chip
                key={platform}
                label={
                  completePlatformOptions.find(
                    platformOption => platformOption.value === platform
                  ).label
                }
                className={classes.chip}
                color="primary"
              />
            ) : (
              <Chip
                key={platform}
                label={
                  completePlatformOptions.find(
                    platformOption => platformOption.value === platform
                  ).label
                }
                className={classes.chip}
                onClick={() => {
                  setActivePlatform(platform);
                }}
              />
            )
          )}
        </div>
      )}
      {chats && chats.length > 0 ? (
        chats.map((chat, index) => (
          <BubbleChat
            type="self"
            key={chat.key}
            dense={index !== 0}
            selected={selected}
          >
            <React.Fragment>
              <div className={classes.headerBubble}>
                {index === 0 && (
                  <React.Fragment>
                    <div>
                      <Typography variant="subtitle2" color="primary">
                        {activeMessage.title}
                      </Typography>
                      {activeMessage.actionName && (
                        <Typography variant="subtitle2">
                          {activeMessage.actionName} ACTION
                        </Typography>
                      )}
                    </div>
                    <Paper className={classes.buttons}>
                      <IconButton
                        className={classes.iconButton}
                        onClick={() => {
                          onChangeDialogInput({
                            type: REPLY_ROBOT,
                            payload: activeMessage
                          });
                        }}
                      >
                        <Reply className={classes.miniIcon} />
                      </IconButton>
                      <IconButton
                        className={classes.iconButton}
                        onClick={() => {
                          onChangeDialogInput({
                            type: EDIT_ROBOT,
                            payload: { ...activeMessage, activePlatform }
                          });
                        }}
                      >
                        <Edit className={classes.miniIcon} />
                      </IconButton>
                      <IconButton
                        className={classes.iconButton}
                        onClick={() => {
                          onChangeDialogInput({
                            type: DELETE_ROBOT,
                            payload: activeMessage
                          });
                        }}
                      >
                        <Delete className={classes.miniIcon} />
                      </IconButton>
                    </Paper>
                  </React.Fragment>
                )}
              </div>
              <MessageView {...chat} />
            </React.Fragment>
          </BubbleChat>
        ))
      ) : (
        <BubbleChat type="self" selected={selected}>
          <React.Fragment>
            <div className={classes.headerBubble}>
              <div>
                <Typography variant="subtitle2" color="primary">
                  {activeMessage.title}
                </Typography>
                {activeMessage.actionName && (
                  <Typography variant="subtitle2">
                    {activeMessage.actionName} ACTION
                  </Typography>
                )}
              </div>
              <Paper className={classes.buttons}>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    onChangeDialogInput({
                      type: REPLY_ROBOT,
                      payload: activeMessage
                    });
                  }}
                >
                  <Reply className={classes.miniIcon} />
                </IconButton>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    onChangeDialogInput({
                      type: EDIT_ROBOT,
                      payload: { ...activeMessage, activePlatform }
                    });
                  }}
                >
                  <Edit className={classes.miniIcon} />
                </IconButton>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    onChangeDialogInput({
                      type: DELETE_ROBOT,
                      payload: activeMessage
                    });
                  }}
                >
                  <Delete className={classes.miniIcon} />
                </IconButton>
              </Paper>
            </div>
            <Typography variant="caption">
              <em>Empty bot response</em>
            </Typography>
          </React.Fragment>
        </BubbleChat>
      )}
    </React.Fragment>
  );
};

RobotMessage.propTypes = {
  messages: PropTypes.array.isRequired,
  onChangeDialogInput: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
};

export default withStyles(style)(RobotMessage);
