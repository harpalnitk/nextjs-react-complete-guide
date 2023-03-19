import EventContent from "@/components/routing-project/event-detail/event-content";
import EventLogistics from "@/components/routing-project/event-detail/event-logistics";
import EventSummary from "@/components/routing-project/event-detail/event-summary";
import { getEventById } from "@/lib/dummy-data";
import { useRouter } from "next/router";


const EventDetailPage = (props) => {

   const router = useRouter();
   const eventId  = router.query.eventId;
   const event = getEventById(eventId);
   if(!event){
      return <p>No event Found!</p>

   }
     return (
<>
<EventSummary title={event.title}></EventSummary>
<EventLogistics 
date={event.date}
address={event.location}
image={event.image}
imageAlt={event.title}
></EventLogistics>
<EventContent>
   <p>{event.description}</p>
</EventContent>
</>
     );
        }


export default EventDetailPage;