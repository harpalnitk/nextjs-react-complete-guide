import EventContent from '@/components/routing-project/event-detail/event-content';
import EventLogistics from '@/components/routing-project/event-detail/event-logistics';
import EventSummary from '@/components/routing-project/event-detail/event-summary';
import Comments from '@/components/routing-project/input/comments';
import ErrorAlert from '@/components/ui/error-alert';
//import { getEventById } from '@/lib/dummy-data';
// import { useRouter } from 'next/router';
import { getEventById, getFeaturedEvents } from '@/helpers/routing-project/api-utils';

const EventDetailPage = (props) => {
 // const router = useRouter();
// const eventId = router.query.eventId;
//   const event = getEventById(eventId);
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
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
      <Comments eventId={event.id}/>
    </>
  );
};

export async function getStaticProps(context){
   const eventId = context.params.eventId;
   const event = await getEventById(eventId);
   
   //! Note get static props would be called for a not already pre
   //renders UTL   e.g. with ID e11
   if(!event){
      return {
         notFound: true
      }
   }
   return {
      props:{
         selectedEvent: event
      },
      revalidate: 30
   }
}

export async function getStaticPaths(){
// no need to pre render all events
   const events = await getFeaturedEvents();
   const paths = events.map(event => ({params:{eventId: event.id}}))

   return {
      paths:paths,
      fallback: true   // means fallback should be used
   }
}


export default EventDetailPage;
