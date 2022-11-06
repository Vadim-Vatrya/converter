import React from 'react';
import styles from './CurrencyBlock.module.scss';

const CurrencyBlock = (props) => {
   
  const { currencyOptions, selectedCurrency } = props;

  return (
    <div className={styles.block}>
      <input type="number" />
      <select value={selectedCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
};

export default CurrencyBlock;