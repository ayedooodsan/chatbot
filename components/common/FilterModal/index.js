import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FilterList from '@material-ui/icons/FilterList';
import Clear from '@material-ui/icons/Clear';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import style from './style';

const FilterModal = props => {
  const { classes, filters, setFilters } = props;
  const [open, setOpen] = useState(false);
  const [myFilters, setMyFilters] = useState([...filters]);

  const onFilterChange = (type, value) => {
    const foundFilterIndex = myFilters.findIndex(
      myFilter => myFilter.type === type
    );

    if ((!value || value === '') && foundFilterIndex !== -1) {
      myFilters.splice(foundFilterIndex, 1);
    } else if (foundFilterIndex !== -1) {
      myFilters[foundFilterIndex].value = value;
    } else {
      myFilters.push({
        type,
        value
      });
    }
    setMyFilters([...myFilters]);
  };

  const getFilterValue = type => {
    const foundFilter = myFilters.find(filter => filter.type === type);
    return foundFilter ? foundFilter.value : null;
  };

  const deliverMyFilters = () => {
    const newFilters = [];
    myFilters.forEach(filter => {
      if (filter.type === 'userSays.queryTime') {
        newFilters.push({
          type: 'userSays.queryTime',
          operator: '$gte',
          value: filter.value.startOf('day').toISOString()
        });
        newFilters.push({
          type: 'userSays.queryTime',
          operator: '$lt',
          value: filter.value
            .add(1, 'days')
            .endOf('day')
            .toISOString()
        });
      }
    });
    setFilters(newFilters);
    setOpen(false);
  };

  const resetFilters = () => {
    setMyFilters([]);
    setFilters([]);
    setOpen(false);
  };

  const handleClose = () => {
    setMyFilters([...filters]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="Filter"
        color="primary"
        onClick={() => setOpen(!open)}
      >
        <Badge badgeContent={myFilters.length} color="primary">
          <FilterList />
        </Badge>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <div className={classes.filterContainer}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                clearable
                fullWidth
                margin="dense"
                label="Query Time"
                variant="outlined"
                value={getFilterValue('userSays.queryTime')}
                onChange={newDate =>
                  onFilterChange('userSays.queryTime', newDate)
                }
                format="DD/MM/YYYY"
              />
            </MuiPickersUtilsProvider>
            {getFilterValue('userSays.queryTime') && (
              <div>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => onFilterChange('userSays.queryTime', null)}
                >
                  <Clear />
                </IconButton>
              </div>
            )}
          </div>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              size="medium"
              variant="contained"
              color="primary"
              onClick={deliverMyFilters}
            >
              Set Filter
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              size="medium"
              onClick={resetFilters}
            >
              Reset Filter
            </Button>
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  );
};

FilterModal.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default withStyles(style)(FilterModal);
