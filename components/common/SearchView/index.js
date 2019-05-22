import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArraowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArraowUp from '@material-ui/icons/KeyboardArrowUp';
import style from './style';

const SearchView = props => {
  const {
    classes,
    activeId,
    id,
    productTitle,
    searchResult,
    index,
    ...otherProps
  } = props;
  const [collapse, setCollapse] = useState(true);
  return (
    <React.Fragment>
      <ListItem
        {...otherProps}
        className={classNames({
          [classes.listItem]: index % 2 === 0
        })}
        divider
        dense
        button
      >
        <ListItemText
          primary={productTitle}
          primaryTypographyProps={{
            variant: 'body2',
            noWrap: true,
            className: classNames({
              [classes.listItemTextActive]: activeId === id
            })
          }}
        />
        {searchResult.length > 0 && (
          <ListItemSecondaryAction>
            <IconButton
              className={classes.secondaryAction}
              aria-label="Collapse"
              onClick={() => {
                setCollapse(!collapse);
              }}
            >
              {collapse ? <KeyboardArraowDown /> : <KeyboardArraowUp />}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {searchResult.map(value => (
            <ListItem key={value} className={classes.nested}>
              <ListItemText
                secondaryTypographyProps={{
                  variant: 'caption',
                  noWrap: true
                }}
                secondary={value}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

SearchView.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(SearchView);
