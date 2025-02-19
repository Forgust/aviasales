import React from 'react';
import PropTypes from 'prop-types';
import classes from './ticket.module.scss';

const Ticket = ({
  price,
  logo,
  citiesThere,
  citiesBack,
  timeThere,
  timeBack,
  flyTimeThere,
  flyTimeBack,
  stopsNamesThere,
  stopsNamesBack,
  stopsCountThere,
  stopsCountBack,
}) => {
  return (
    <div className={classes.ticket}>
      <div className={classes['ticket__header']}>
        <span className={classes['ticket__price']}>{price}</span>
        <img src={logo} alt="ticket logo"></img>
      </div>
      <div className={classes['ticket__body']}>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>{citiesThere}</span>
          <span>{timeThere}</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>в пути</span>
          <span>{flyTimeThere}</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--transfers']}>{stopsCountThere}</span>
          <span>{stopsNamesThere}</span>
        </div>
      </div>
      <div className={classes['ticket__body']}>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>{citiesBack}</span>
          <span>{timeBack}</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>в пути</span>
          <span>{flyTimeBack}</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--transfers']}>{stopsCountBack}</span>
          <span>{stopsNamesBack}</span>
        </div>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  price: PropTypes.string,
  logo: PropTypes.string,
  citiesThere: PropTypes.string,
  citiesBack: PropTypes.string,
  timeThere: PropTypes.string,
  timeBack: PropTypes.string,
  flyTimeThere: PropTypes.string,
  flyTimeBack: PropTypes.string,
  stopsNamesThere: PropTypes.string,
  stopsNamesBack: PropTypes.string,
  stopsCountThere: PropTypes.string,
  stopsCountBack: PropTypes.string,
};

export default Ticket;
