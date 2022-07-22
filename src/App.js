import { useState, useEffect } from "react"
import axios from 'axios'

const App = () => {

  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(false)

  const hook = () => {
    //get countries API when start
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        console.log('promise fulfilled')
        setCountries(res.data)
        //console.log(res.data[0].name)
      });
  }

  useEffect(hook, [])

  const getLanguages = (dict) => {
    const keys = Object.keys(dict)
    //console.log(keys)
    return keys.map(lang => <li>{dict[lang]}</li>)
  }

  const handledButton = () => {
    if(show===false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const filteredCountries = () => {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))

    if(filtered.length > 10) {

      return <div>Too many matches, specify another filter</div>

    } else if(filtered.length === 1) {

      return (
        <div>
          <h1>{filtered[0].name.common}</h1>
          <div>capital {filtered[0].capital}</div>
          <div>area {filtered[0].area}</div>
          <h2>languages :</h2>
          <div>
            {getLanguages(filtered[0].languages)}
          </div>
          <img src={filtered[0].flags.png} alt={filtered[0].flag} />
        </div>

      )
    } else {

      //console.log(filter)

      return (
      <div>
        {filtered.map(country => (
        <div>
          <div key={country.name.common} > {country.name.common} <button key={country.name.common} onClick={() => (handledButton())}>show</button></div>
          {show && <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages :</h2>
            <div>{getLanguages(country.languages)}</div>
            <img src={country.flags.png} alt={country.flag} />
          </div>}
        </div>
        ))}
      </div>
      )
    }

  }

  return (
    <div>
      <div>
        find countries <input onChange={e => setName(e.target.value)} />
      </div>
      <div>
        {filteredCountries()}
      </div>
    </div>
  )
}

export default App
