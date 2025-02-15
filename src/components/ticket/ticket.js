import React from 'react';

import logo from './S7 Logo.png';
import classes from './ticket.module.scss';

const Ticket = () => {
  return (
    <div className={classes.ticket}>
      <div className={classes['ticket__header']}>
        <span className={classes['ticket__price']}>13 400 Р</span>
        <img src={logo} alt="ticket logo"></img>
      </div>
      <div className={classes['ticket__body']}>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>MOW-HKT</span>
          <span>10:45 - 08:00</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>в пути</span>
          <span>21ч 15м</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--transfers']}>2 пересадки</span>
          <span>HGJ, JNB</span>
        </div>
      </div>
      <div className={classes['ticket__body']}>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>MOW-HKT</span>
          <span>11:20 – 00:50</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--title']}>в пути</span>
          <span>13ч 30м</span>
        </div>
        <div className={classes['ticket-column']}>
          <span className={classes['column--transfers']}>1 пересадка</span>
          <span>HGJ</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
