import { AppProps } from 'next/app';

import '../css/index.css';
import { AuthProvider } from '../hooks/useAuth';

export default function App({ Component, pageProps }: AppProps): any {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
