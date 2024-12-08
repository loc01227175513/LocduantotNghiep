'use client'
import Script from 'next/script'

export function Providers({ children }) {
  return (
    <>
      {children}
      <Script 
        src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries" 
        strategy="afterInteractive" 
      />
    </>
  )
} 