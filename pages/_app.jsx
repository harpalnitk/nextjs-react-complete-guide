import '../styles/globals.css';
import RoutingProjectLayout from '@/components/routing-project/layout/layout';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
    </Head>
  <RoutingProjectLayout > <Component {...pageProps} /></RoutingProjectLayout>

    </>
 )
}

export default MyApp