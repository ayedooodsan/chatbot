import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Pagination from 'material-ui-flat-pagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import FilterModal from '../../common/FilterModal';
import style from './style';

const SimpleSubNavHead = props => {
  const {
    pagination,
    classes,
    handleClickPagination,
    setKeyword,
    keyword,
    onAddItem,
    title,
    hasAdvanceSearch,
    setAdvancedSearch,
    noPagination,
    advancedSearch,
    openSearch,
    setOpenSearch,
    filters,
    setFilters
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
    if (hasAdvanceSearch) {
      setAdvancedSearch(false);
    }
    setKeyword('');
    handleClickPagination(0);
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
          {filters && <FilterModal filters={filters} setFilters={setFilters} />}
        </div>
      </div>
      {openSearch && (
        <React.Fragment>
          <TextField
            value={keyword}
            onChange={event => {
              setKeyword(event.target.value);
              handleClickPagination(0);
            }}
            inputRef={searchInputRef}
            autoFocus
            label="Keyword"
            margin="dense"
            variant="outlined"
            fullWidth
          />
          {hasAdvanceSearch && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={advancedSearch}
                  onChange={event => setAdvancedSearch(event.target.checked)}
                  color="primary"
                />
              }
              label="Advanced search"
            />
          )}
        </React.Fragment>
      )}
      {!noPagination && pagination.limit < pagination.dataLength && (
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

SimpleSubNavHead.defaultProps = {
  hasAdvanceSearch: false,
  advancedSearch: false,
  setAdvancedSearch: null,
  noPagination: false,
  pagination: {},
  handleClickPagination: null,
  filters: null,
  setFilters: null
};

SimpleSubNavHead.propTypes = {
  classes: PropTypes.object.isRequired,
  setKeyword: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  openSearch: PropTypes.bool.isRequired,
  setOpenSearch: PropTypes.func.isRequired,
  setFilters: PropTypes.func,
  filters: PropTypes.array,
  pagination: PropTypes.object,
  handleClickPagination: PropTypes.func,
  hasAdvanceSearch: PropTypes.bool,
  advancedSearch: PropTypes.bool,
  setAdvancedSearch: PropTypes.func,
  noPagination: PropTypes.bool
};

export default withStyles(style)(SimpleSubNavHead);
