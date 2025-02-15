import React from 'react';
import { Checkbox, Segmented, Typography } from 'antd';
import classes from './filters.module.scss';

const { Title } = Typography;

const TransfersFilter = () => {
  const transfersData = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const transfersList = transfersData.map((item, i) => {
    return <Checkbox key={i}>{item}</Checkbox>;
  });

  return (
    <div className={classes['trans-filter']}>
      <Title level={5} style={{ margin: 0 }}>
        Количество пересадок
      </Title>
      <div className={classes['trans-filter__list']}>{transfersList}</div>
    </div>
  );
};

const PricesFilter = () => {
  return (
    <div className={classes['price-filter']}>
      <Segmented options={['самый дешевый', 'самый быстрый', 'оптимальный']} size={'large'} />
    </div>
  );
};

export { TransfersFilter, PricesFilter };
