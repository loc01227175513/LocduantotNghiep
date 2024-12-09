'use client'

import { ClientProvider } from './components/ClientProvider'

export function Providers({ children }) {
  return <ClientProvider>{children}</ClientProvider>
} 