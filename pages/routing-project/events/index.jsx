// import { getAllEvents } from "@/lib/dummy-data";
import { getAllEvents } from "@/helpers/routing-project/api-utils";
import EventList from "@/components/routing-project/event-list";
import EventsSearch from "@/components/routing-project/events-search";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const router= useRouter();

  function findEventsHandler(year,month){
     const fullPath = `/routing-project/events/${year}/${month}`;
     router.push(fullPath);
  }

  //  const events = getAllEvents();
   const {events} = props;
     return (
         <>
          <EventsSearch onSearch={findEventsHandler}></EventsSearch>
           <EventList items={events}></EventList>
         </>
     );
        }

        export async function getStaticProps(){
          const events = await getAllEvents();
          return{
            props:{
              events:events
            },
            revalidate: 60
          }
        }


export default AllEventsPage;