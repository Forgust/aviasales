import React from 'react';
import Ticket from '../ticket/ticket';

import classes from './tickets-list.module.scss';

const TicketList = () => {
  return (
    <div className={classes['tickets-list']}>
      <Ticket></Ticket>
      <Ticket></Ticket>
      <Ticket></Ticket>
      <Ticket></Ticket>
      <Ticket></Ticket>
    </div>
  );
};

export default TicketList;
