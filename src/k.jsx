import { useEffect, useState } from 'react'
// import './styles.css'
const KEY = '670d8e02c262eb22a4b4e81cdfdfebfe'

export default function K() {
  const [input, setInput] = useState(1)
  const [from, setFrom] = useState('EUR')
  const [to, setTo] = useState('USD')
  const [sum, setSum] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const currencyFetch = async () => {
      setIsLoading(true)
      const res = await fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${KEY}`
      )
      const data = await res.json()
      const rates = data.rates
      setSum((rates[to] * (input * rates[from])).toFixed(2))
      setIsLoading(false)
    }
    currencyFetch()
  }, [from, to, input])
  return (
    <div>
      <input
        disabled={isLoading}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? 'loading...' : sum}</p>
    </div>
  )
}
