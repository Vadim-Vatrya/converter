import { useEffect, useState } from 'react';
import CurrencyBlock from './components/CurrencyBlock/CurrencyBlock';
import Container from './components/Container/Container';
import './scss/_main.scss';

const BASE_URL = 'https://api.exchangerate.host/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  // console.log(currencyOptions);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
      });
  }, []);

  return (
    <>
      <Container>
        <h1>Convert</h1>
        <CurrencyBlock
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
        />
        <div className="equals"> = </div>
        <CurrencyBlock
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
        />
      </Container>
    </>
  );
}

export default App;
