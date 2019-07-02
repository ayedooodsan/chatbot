import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LinkIcon from '@material-ui/icons/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const LinksView = props => {
  const { value, classes } = props;
  return (
    <Card className={classes.card}>
      {value.image && value.image !== '' && (
        <CardMedia
          className={classes.media}
          image={value.image}
          title="Image"
        />
      )}
      <CardContent>
        <Typography component="p">{value.text}</Typography>
      </CardContent>
      {value.links.map(link => (
        <React.Fragment key={link.url}>
          <Divider />
          <CardActionArea
            component={({ children, ...otherProps }) => (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a href={link.url} target="_blank" {...otherProps}>
                {children}
              </a>
            )}
          >
            <CardContent className={classes.cardContent}>
              {link.icon && link.icon !== '' ? (
                <Avatar
                  alt={link.text}
                  src={link.icon}
                  className={classNames(classes.avatar, classes.avatarImage)}
                />
              ) : (
                <Avatar className={classes.avatar}>
                  <LinkIcon color="primary" />
                </Avatar>
              )}
              <Typography component="caption" color="primary">
                {link.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </React.Fragment>
      ))}
    </Card>
  );
};

LinksView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(LinksView);
