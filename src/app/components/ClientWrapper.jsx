'use client'

import { createContext, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'

// Create a context for toggle state
export const ToggleContext = createContext({
  isToggled: false,
  setToggle: () => {},
})

export default function ClientWrapper({ children }) {
  const [isToggled, setIsToggled] = useState(false)

  const toggleValue = {
    isToggled,
    setToggle: setIsToggled
  }

  return (
    <ToggleContext.Provider value={toggleValue}>
      <div>
        {children}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        limit={3}
        enableMultiContainer={false}
        containerId="default"
      />
    </ToggleContext.Provider>
  )
}

// Custom hook to use toggle
export const useToggle = () => {
  const context = useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider')
  }
  return context
} 