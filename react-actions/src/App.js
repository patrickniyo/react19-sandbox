import React, { useState, useTransition } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isPending, startTransition] = useTransition(false); // reat19-rc transitions
  const [countries, setCountries] = useState([]);

  const loadCountries =  () => {
    startTransition((async() => {

      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        // Extract the first 10 countries
        const firstTenCountries = response.data.slice(0, 10).map(country => ({
          name: country.name.common,
          flag: country.flags.png,
        }));
        setCountries(firstTenCountries);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
      }
    }))
  };

  return (
    <div className="App flex min-h-[100vh] items-center justify-around">
      <div>
        <h1 className='font-bold text-xl'>React Actions</h1>
        <button
          className='bg-black py-2 px-4 mt-4 rounded-md text-white text-md flex items-center justify-center'
          onClick={loadCountries}
          disabled={isPending}
        >
          {isPending ? (
            <div className="loader"></div>
          ) : (
            'Load Countries'
          )}
        </button>
        <div className='mt-4'>
          {countries.map((country, index) => (
            <div key={index} className='country-item flex items-center'>
              <img src={country.flag} alt={`Flag of ${country.name}`} className='w-8 h-5 mr-2'/>
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
