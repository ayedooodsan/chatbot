import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Pagination from 'material-ui-flat-pagination';

import style from './style';

const SimpleSubNavHead = props => {
  const [openSearch, setOpenSearch] = useState(false);
  const {
    pagination,
    classes,
    handleClickPagination,
    setKeyword,
    keyword,
    onAddItem,
    title
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
        <Typography variant="h6" className={classes.menuTitle}>
          {title}
        </Typography>
        <div>
          <IconButton color="primary" size="medium" onClick={onAddItem}>
            <Add />
          </IconButton>
          <IconButton color="primary" onClick={toggleSearch} size="medium">
            {openSearch ? <Clear /> : <Search />}
          </IconButton>
        </div>
      </div>
      {openSearch && (
        <Input
          inputRef={searchInputRef}
          placeholder="Keyword"
          value={keyword}
          onChange={setKeyword}
          className={classes.searchInput}
          inputProps={{
            'aria-label': 'Description'
          }}
          fullWidth
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

SimpleSubNavHead.propTypes = {
  pagination: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleClickPagination: PropTypes.func.isRequired,
  setKeyword: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired
};

export default withStyles(style)(withRouter(SimpleSubNavHead));
