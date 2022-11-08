import { useEffect, useState } from 'react';
import CurrencyBlock from './components/CurrencyBlock/CurrencyBlock';
import Container from './components/Container/Container';
import './scss/_main.scss';

const BASE_URL = 'https://api.exchangerate.host/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  // console.log(exchangeRate);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <Container>
        <h1>Convert</h1>
        <CurrencyBlock
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={event => setFromCurrency(event.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className="equals"> = </div>
        <CurrencyBlock
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={event => setToCurrency(event.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </Container>
    </>
  );
}

export default App;
