import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import classes from './App.module.scss';
import Header from './components/header';
import { TransfersFilter, PricesFilter } from './components/filters';
import { getSearchId, debouncedGetTickets } from './store/actions';
import Loader from './components/loader';

import TicketList from './components/tickets-list';
import EmptyError from './components/error';

function App() {
  const dispatch = useDispatch();
  const { stop, searchId, resId, filteredTickets } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSearchId());
  }, []);

  useEffect(() => {
    if (!searchId) {
      return;
    }
    if (!stop) {
      debouncedGetTickets(searchId, dispatch);
    }
  }, [stop, searchId, resId]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedColor: 'white',
            itemSelectedBg: '#2196f3',
            trackBg: 'white',
          },
        },
      }}
    >
      <main className={classes.App}>
        <Header />
        <div className={classes['app_main']}>
          <TransfersFilter />
          <PricesFilter />
          {!stop ? <Loader /> : null}
          {stop && filteredTickets.length === 0 ? <EmptyError /> : null}
          <TicketList />
        </div>
      </main>
    </ConfigProvider>
  );
}

export default App;
