import React from 'react';
import { Alert } from '@mui/material';

const EmptyError = () => {
  return (
    <Alert sx={{ width: '100%', maxWidth: '500px', alignSelf: 'start', justifySelf: 'start' }} severity="info">
      Ничего не найдено по выбранным фильтрам
    </Alert>
  );
};

export default EmptyError;
