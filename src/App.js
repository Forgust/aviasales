/*eslint-disable*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import classes from './App.module.scss';
import Header from './components/header';
import { TransfersFilter, PricesFilter } from './components/filters';
import { getSearchId, getTickets } from './components/store/actions';

import TicketList from './components/tickets-list';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, []);

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
      <div className={classes.App}>
        <Header />
        <div className={classes['app_main']}>
          <TransfersFilter />
          <PricesFilter />
          <TicketList />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;

/*eslint-enable*/
