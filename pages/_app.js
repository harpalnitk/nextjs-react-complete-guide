import '../styles/globals.css';
import RoutingProjectLayout from '@/components/routing-project/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
  <RoutingProjectLayout> <Component {...pageProps} /></RoutingProjectLayout>
 )
}

export default MyApp