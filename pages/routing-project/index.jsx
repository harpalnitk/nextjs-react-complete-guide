//import { getFeaturedEvents } from "@/lib/dummy-data";
import EventList from "@/components/routing-project/event-list";
import { getFeaturedEvents } from "@/helpers/routing-project/api-utils";

const HomePage = (props) => {

  // const featuredEvents = getFeaturedEvents();
     return (
     
         <div>
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