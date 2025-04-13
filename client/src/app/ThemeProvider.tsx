'use client'

import { useEffect } from 'react'
import { useAppSelector } from './redux'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark"); // Add dark mode class
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode class
      document.documentElement.classList.add("light")
    }
  }, [isDarkMode]);


  return <>{children}</>
} 