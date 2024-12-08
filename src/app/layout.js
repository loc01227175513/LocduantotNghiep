import { Providers } from './providers'
import { Fonts } from './components/common/Fonts'
import { Analytics } from './components/common/Analytics'
import localFont from 'next/font/local'
import Script from 'next/script'

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
    <html lang="en">
      <Fonts />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}