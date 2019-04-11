import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import Pagination from 'material-ui-flat-pagination';
import CustomInput from '../CustomInput';

import { Link } from '../../routes';
import style from './style';

const DialogsBar = props => {
  const [openSearch, setOpenSearch] = useState(false);
  const {
    pagination,
    classes,
    handleClickPagination,
    setKeyword,
    projectId
  } = props;
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (openSearch) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  const showSearch = () => {
    setOpenSearch(true);
  };

  const hideSearch = () => {
    setOpenSearch(false);
    setKeyword('');
  };

  const toggleSearch = () => {
    if (openSearch) {
      hideSearch();
    } else {
      showSearch();
    }
  };

  return (
    <React.Fragment>
      <div className={classes.title}>
        <Typography
          variant="overline"
          className={`${classes.menuTitle} ${classes.whiteText}`}
        >
          DIALOG
        </Typography>
        <div>
          <Link route={`/${projectId}/dialog/0`}>
            <IconButton color="primary" size="medium">
              <Add />
            </IconButton>
          </Link>
          <IconButton color="primary" onClick={toggleSearch} size="medium">
            {openSearch ? <Clear /> : <Search />}
          </IconButton>
        </div>
      </div>
      {openSearch && (
        <CustomInput
          justInput
          inputProps={{
            inputRef: searchInputRef,
            className: classes.searchInput,
            placeholder: 'Keyword'
          }}
          formControlProps={{
            fullWidth: true
          }}
        />
      )}
      {pagination.limit < pagination.dataLength && (
        <Pagination
          className={classes.pagination}
          limit={pagination.limit}
          offset={pagination.offset}
          total={pagination.dataLength}
          centerRipple
          innerButtonCount={1}
          outerButtonCount={1}
          onClick={(e, offset) => handleClickPagination(offset)}
        />
      )}
    </React.Fragment>
  );
};

DialogsBar.propTypes = {
  pagination: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleClickPagination: PropTypes.func.isRequired,
  setKeyword: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired
};

export default withStyles(style)(DialogsBar);
