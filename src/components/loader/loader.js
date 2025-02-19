import { Spin } from 'antd';
import React from 'react';
import classes from './loader.module.scss';
const Loader = () => {
  return <Spin type="Loading..." size="large" className={classes.loader} />;
};

export default Loader;
