import '../styles/globals.css';
import RoutingProjectLayout from '@/components/routing-project/layout/layout';
import Head from 'next/head';
import { NotificationContextProvider } from '@/store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>

  <RoutingProjectLayout >
  <Head>
      <title>Nextjs React Course</title>
      <meta name='description' content='Nextjs React Complete guide by maximillian'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
    </Head>
     <Component {...pageProps} />
  </RoutingProjectLayout>

    </NotificationContextProvider>
 )
}

export default MyApp