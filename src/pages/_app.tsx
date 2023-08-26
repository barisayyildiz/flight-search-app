import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
