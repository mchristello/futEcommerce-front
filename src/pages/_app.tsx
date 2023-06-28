import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from './layout'
import { CartProvider } from 'context/CartContext'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }, 
}: AppProps) {
  
  
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SessionProvider>
    )
}
