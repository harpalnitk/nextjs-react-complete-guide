import { getFeaturedEvents } from "@/lib/dummy-data";
import EventList from "@/components/routing-project/event-list";

const HomePage = (props) => {

   const featuredEvents = getFeaturedEvents();
     return (
     
         <div>
           <EventList items={featuredEvents}/>
         </div>
    

     );
        }


export default HomePage;