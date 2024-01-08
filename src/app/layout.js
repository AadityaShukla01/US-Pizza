import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AppProvider } from '@/context/AppContext'
import { Toaster } from 'react-hot-toast'

const roboto = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata = {
  title: 'U.S. Pizza',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} >
        <ThemeProvider>
          <main className='max-w-4xl mx-auto p-4'>
            <AppProvider>
              <Header />
              <div><Toaster/></div>
              {children}
              <hr className='' />
              <Footer className="" />
            </AppProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
