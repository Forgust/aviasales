import React from 'react';
import { ConfigProvider } from 'antd';
import classes from './App.module.scss';
import Header from './components/header';
import { TransfersFilter, PricesFilter } from './components/filters';

import TicketList from './components/tickets-list';
console.log(classes);
function App() {
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
