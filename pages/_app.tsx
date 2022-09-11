import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
