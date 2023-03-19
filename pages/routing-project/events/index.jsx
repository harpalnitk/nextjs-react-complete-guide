import { getAllEvents } from "@/lib/dummy-data";
import EventList from "@/components/routing-project/event-list";
import EventsSearch from "@/components/routing-project/events-search";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const router= useRouter();

  function findEventsHandler(year,month){
     const fullPath = `/routing-project/events/${year}/${month}`;
     router.push(fullPath);
  }

   const events = getAllEvents();
     return (
         <>
          <EventsSearch onSearch={findEventsHandler}></EventsSearch>
           <EventList items={events}></EventList>
         </>
     );
        }


export default AllEventsPage;