import { useEffect, useState } from 'react'

export const useLocalStorageState = (initState, key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initState
  })

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
