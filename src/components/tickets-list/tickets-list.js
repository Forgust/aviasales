import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { getNextTickets } from '../../store/actions';
import DataHandler from '../data-handler';

import classes from './tickets-list.module.scss';

const TicketList = () => {
  const handler = new DataHandler();
  const { filteredTickets, ticketsInPage } = useSelector((state) => state.data);

  const ticketList = handler.getTicketsListComponent(filteredTickets, ticketsInPage);

  return (
    <div className={classes['tickets-list']}>
      {ticketList}
      {ticketList.length < 5 ? null : <ButtonView />}
    </div>
  );
};

const ButtonView = () => {
  const dispatch = useDispatch();
  const nextTickets = () => () => dispatch(getNextTickets());
  return (
    <Button
      onClick={nextTickets()}
      type="primary"
      className={classes['show-more']}
      style={{ width: '100%', maxWidth: '500px', alignSelf: 'start', height: '40px' }}
    >
      показать еще 5 билетов!
    </Button>
  );
};

export default TicketList;
