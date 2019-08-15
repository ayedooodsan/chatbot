import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Carousel from 'nuka-carousel';
import Style from './style';

const CardView = props => {
  const { value, classes } = props;
  return (
    <div className={classes.cardContainer}>
      <Carousel
        transitionMode="fade"
        renderCenterLeftControls={({
          currentSlide,
          slideCount,
          previousSlide
        }) =>
          slideCount > 1 && (
            <Fab
              className={classes.leftNav}
              onClick={previousSlide}
              disabled={currentSlide === 0}
              size="small"
              color="primary"
              aria-label="Previous"
            >
              <NavigateBefore fontSize="small" />
            </Fab>
          )
        }
        renderCenterRightControls={({ currentSlide, slideCount, nextSlide }) =>
          slideCount > 1 && (
            <Fab
              className={classes.rightNav}
              onClick={nextSlide}
              disabled={currentSlide === slideCount - 1}
              size="small"
              color="primary"
              aria-label="Next"
            >
              <NavigateNext fontSize="small" />
            </Fab>
          )
        }
        renderBottomCenterControls={() => null}
      >
        {value.map(card => (
          <Card className={classes.card} key={card.title}>
            {card.imageUrl && card.imageUrl !== '' && (
              <CardMedia
                className={classes.media}
                image={card.imageUrl}
                title="Image"
              />
            )}
            <CardContent>
              <Typography
                gutterBottom={card.subtitle && card.subtitle !== ''}
                variant="h6"
              >
                {card.title}
              </Typography>
              {card.subtitle && card.subtitle !== '' && (
                <Typography component="p" variant="caption">
                  {card.subtitle}
                </Typography>
              )}
            </CardContent>
            {card.buttons.map(button => (
              <React.Fragment key={button.text}>
                <Divider />
                <CardActionArea
                  component={({ children, ...otherProps }) => (
                    // eslint-disable-next-line react/jsx-no-target-blank
                    <a href={button.postback} target="_blank" {...otherProps}>
                      {children}
                    </a>
                  )}
                >
                  <CardContent className={classes.cardContent}>
                    <Typography component="p" variant="caption" color="primary">
                      {button.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </React.Fragment>
            ))}
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

CardView.propTypes = {
  value: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(CardView);
