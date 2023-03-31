//import { getFeaturedEvents } from "@/lib/dummy-data";
import EventList from "@/components/routing-project/event-list";
import { getFeaturedEvents } from "@/helpers/routing-project/api-utils";
// meta tags
import Head from 'next/head';
const HomePage = (props) => {

  // const featuredEvents = getFeaturedEvents();
     return (
     
         <div>
          <Head>
            <title>NextJs Events</title>
            <meta name='description' content="Find a lot of great events that allow you to evolve..."/>
          </Head>
           <EventList items={props.events}/>
         </div>
    

     );
        }

        export async function getStaticProps(){
          const featuredEvents = await getFeaturedEvents();
          return{
            props:{
              events: featuredEvents
            },
            revalidate:1800 // every half hour
          }
        }


export default HomePage;