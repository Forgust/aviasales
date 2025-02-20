import React, { useEffect } from 'react';
import { Checkbox, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckbox, togglePriceBtn } from '../store/actions';

import classes from './filters.module.scss';

const { Title } = Typography;

const TransfersFilter = () => {
  const dispatch = useDispatch();
  const { all, noTransfers, oneTransfer, twoTransfers, threeTransfers } = useSelector((state) => state.data);

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
  const dispatch = useDispatch();
  const { activePrice, resId } = useSelector((state) => state.data);
  useEffect(() => {
    if (!activePrice) {
      return;
    }
    dispatch(togglePriceBtn(activePrice));
  }, [resId]);
  return (
    <div className={classes['price-filter']}>
      <button
        onClick={() => dispatch(togglePriceBtn('lowPrice'))}
        className={`${classes['price-btn']} ${activePrice === 'lowPrice' ? classes.active : ''}`}
      >
        самый дешевый
      </button>
      <button
        onClick={() => dispatch(togglePriceBtn('hightSpeed'))}
        className={`${classes['price-btn']} ${activePrice === 'hightSpeed' ? classes.active : ''}`}
      >
        самый быстрый
      </button>
    </div>
  );
};

export { TransfersFilter, PricesFilter };
