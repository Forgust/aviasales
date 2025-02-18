/*eslint-disable*/
import React from 'react';
import { Checkbox, Segmented, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckbox } from '../store/actions';

import classes from './filters.module.scss';

const { Title } = Typography;

const TransfersFilter = () => {
  const dispatch = useDispatch();
  const { all, noTransfers, oneTransfer, twoTransfers, threeTransfers } = useSelector((state) => state.checkboxReducer);

  return (
    <div className={classes['trans-filter']}>
      <Title level={5} style={{ margin: 0 }}>
        Количество пересадок
      </Title>
      <div className={classes['trans-filter__list']}>
        <Checkbox checked={all} onChange={() => dispatch(toggleCheckbox('all'))}>
          Все
        </Checkbox>
        <Checkbox checked={noTransfers} onChange={() => dispatch(toggleCheckbox('noTransfers'))}>
          Без пересадок
        </Checkbox>
        <Checkbox checked={oneTransfer} onChange={() => dispatch(toggleCheckbox('oneTransfer'))}>
          1 пересадка
        </Checkbox>
        <Checkbox checked={twoTransfers} onChange={() => dispatch(toggleCheckbox('twoTransfers'))}>
          2 пересадки
        </Checkbox>
        <Checkbox checked={threeTransfers} onChange={() => dispatch(toggleCheckbox('threeTransfers'))}>
          3 пересадки
        </Checkbox>
      </div>
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
/*eslint-enable*/
