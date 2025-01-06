import { Moon, Sun } from 'lucide-react'
import {useEffect, useState} from 'react'

const ToggleTheme = () => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    document.documentElement.classList.remove(theme)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.add('transition')
    document.documentElement.classList.add(newTheme)
    setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 1000)
  }
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if(localTheme) {
      setTheme(localTheme)
      document.documentElement.classList.add(localTheme)
    }})
  return (
    <div>
      <button className='w-10 h-10 rounded-md ring-2 ring-inset ring-gray-200  dark:ring-gray-700 p-2 flex items-center justify-center ' onClick={toggleTheme}>{
        theme === 'light' ? <Moon /> : <Sun />
        }</button>
    </div>
  )
}

export default ToggleTheme
