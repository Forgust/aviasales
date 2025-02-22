import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckbox, togglePriceBtn } from '../../store/actions';

import classes from './filters.module.scss';

const { Title } = Typography;

const TransfersFilter = () => {
  const dispatch = useDispatch();
  const { all, noTransfers, oneTransfer, twoTransfers, threeTransfers } = useSelector((state) => state.data);

  return (
    <div className={classes['trans-filter']}>
      <Title level={5} style={{ margin: 0, fontSize: '13px', fontWeight: '500', padding: '0  16px' }}>
        Количество пересадок
      </Title>
      <div className={classes['trans-filter__list']}>
        <input type="checkbox" id="item" className={classes.checkbox} checked={all} />
        <label onClick={() => dispatch(toggleCheckbox('all'))} htmlFor="item">
          Все
        </label>
        <input type="checkbox" id="item" className={classes.checkbox} checked={noTransfers} />
        <label onClick={() => dispatch(toggleCheckbox('noTransfers'))} htmlFor="item">
          Без пересадок
        </label>
        <input type="checkbox" id="item" className={classes.checkbox} checked={oneTransfer} />
        <label onClick={() => dispatch(toggleCheckbox('oneTransfer'))} htmlFor="item">
          1 пересадка
        </label>
        <input type="checkbox" id="item" className={classes.checkbox} checked={twoTransfers} />

        <label onClick={() => dispatch(toggleCheckbox('twoTransfers'))} htmlFor="item">
          2 пересадки
        </label>
        <input type="checkbox" id="item" className={classes.checkbox} checked={threeTransfers} />

        <label onClick={() => dispatch(toggleCheckbox('threeTransfers'))} htmlFor="item">
          3 пересадки
        </label>
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
