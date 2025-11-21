import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <CartProvider>
        {getLayout(<Component {...pageProps} />)}
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
