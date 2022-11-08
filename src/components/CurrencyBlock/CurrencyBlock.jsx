import React from 'react';
import styles from './CurrencyBlock.module.scss';

const CurrencyBlock = (props) => {
   
  const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;

  return (
    <div className={styles.block}>
      <input type="number" className='input' value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
};

export default CurrencyBlock;