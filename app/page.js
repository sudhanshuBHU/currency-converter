"use client";

import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { ArrowRightLeft } from 'lucide-react';

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('inr');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchExchangeRates = async () => {
      setLoading(true);
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
      const data = await response.json();
      setDate(data.date);
      // console.log(data);      
      // console.log(data[`${fromCurrency}`]);
      setCurrencies(Object.keys(data[`${fromCurrency}`]));
      setExchangeRate(data[`${fromCurrency}`][`${toCurrency}`]);
      setLoading(false);
    };
    fetchExchangeRates();
  }, [toCurrency, fromCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleExchange = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const convertedAmount = amount * exchangeRate;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {
        loading ? <FadeLoader /> :

          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
            <div className="mb-4">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <div className="flex justify-between items-center mb-2">
                <select
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                  className="w-1/2 p-2 border border-gray-300 rounded mr-2"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
                </select>
                <span className="mx-2" onClick={handleExchange}><ArrowRightLeft /></span>
                <select
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                  className="w-1/2 p-2 border border-gray-300 rounded ml-2"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center">
              {amount} {fromCurrency.toUpperCase()} is equal to {convertedAmount.toFixed(2)} {toCurrency.toUpperCase()}
            </h2>
            <p className='text-right mt-2 text-blue-500'>Last Updated on {date}</p>
          </div>
      }
    </div>
  );
}
