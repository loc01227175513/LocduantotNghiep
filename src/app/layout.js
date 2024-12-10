import { Providers } from './providers'
import { Fonts } from './components/common/Fonts'
import { Analytics } from './components/common/Analytics'
import localFont from 'next/font/local'
import ClientWrapper from './components/ClientWrapper'
import LayoutContent from './components/LayoutContent'

// CSS imports
import '../assets/css/plugins/fontawesome-6.css'
import '../assets/css/plugins/swiper.min.css'
import '../assets/css/vendor/bootstrap.min.css'
import '../assets/css/vendor/magnific-popup.css'
import '../assets/css/vendor/metismenu.css'
import '../assets/css/style.css'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

// Font configurations
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata = {
  title: "Course Platform",
  description: "Online Learning Platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Fonts />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ClientWrapper>
            <LayoutContent>
              {children}
            </LayoutContent>
          </ClientWrapper>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}