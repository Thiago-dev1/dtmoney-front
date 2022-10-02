import type { AppProps } from 'next/app'

import "../styles/main.css"
import { TransactionProvaider } from '../context/TransactionsContex'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvaider>
      <Component {...pageProps} />
    </TransactionProvaider>

  )
}

export default MyApp
