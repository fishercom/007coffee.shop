import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/login') {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </AuthProvider>
  );
}

export default MyApp;
