import { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import style from './style';

const EntityField = props => {
  const { intialValue, onChange, onDelete, classes } = props;
  const [keyword, setKeyword] = useState(intialValue.keyword);
  const [synonyms, setSynonyms] = useState(intialValue.synonyms);

  const handleKeywordChange = event => {
    setKeyword(event.target.value);
  };
  const handleKeywordBlur = () => {
    if (intialValue.keyword !== keyword) {
      onChange(keyword, 'keyword');
    }
  };

  const handleAddSynonym = synonym => {
    synonyms.push(synonym);
    setSynonyms(synonyms);
  };
  const handleDeleteSynonym = (synonym, index) => {
    synonyms.splice(index, 1);
    setSynonyms([...synonyms]);
  };
  const handleSynonymsBlur = () => {
    if (intialValue.synonyms !== synonyms) {
      onChange(synonyms, 'synonyms');
    }
  };
  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container alignItems="center">
        <Grid item md={3}>
          <InputBase
            value={keyword}
            onChange={handleKeywordChange}
            inputProps={{
              onBlur: handleKeywordBlur
            }}
            autoFocus
            fullWidth
            className={classes.input}
            placeholder="Keyword"
          />
        </Grid>
        <Grid item md={9}>
          <ChipInput
            classes={{
              inputRoot: classes.inputRoot,
              chip: classes.chip,
              chipContainer: classes.chipContainer
            }}
            disableUnderline
            fullWidth
            value={synonyms}
            onAdd={handleAddSynonym}
            onDelete={handleDeleteSynonym}
            onBlur={handleSynonymsBlur}
            placeholder="Synonyms"
          />
        </Grid>
      </Grid>
      <IconButton
        onClick={onDelete}
        className={classes.iconButton}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

EntityField.propTypes = {
  intialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(EntityField);
