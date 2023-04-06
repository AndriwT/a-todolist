import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp  } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDMlSAW7ZCO2_gcJqXy3_-hKAAVdL5WbE4",
  authDomain: "todo-items-6cfbb.firebaseapp.com",
  projectId: "todo-items-6cfbb",
  storageBucket: "todo-items-6cfbb.appspot.com",
  messagingSenderId: "480230462942",
  appId: "1:480230462942:web:44dfcc1714db309d05394f"
};

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
