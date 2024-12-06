'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme' // You can create this file for custom theming

export function Providers({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </>
  )
} 